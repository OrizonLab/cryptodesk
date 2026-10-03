(() => {
  const root = document.getElementById('cot-explorer');
  if (!root) return;

  const svg = document.getElementById('cot-chart');
  const marketSelect = document.getElementById('cot-market');
  const categorySelect = document.getElementById('cot-category');
  const rangeSelect = document.getElementById('cot-range');
  const empty = document.getElementById('cot-no-data');
  const categoryMeta = {
    lev_money: { label: 'Fonds à effet de levier', long: 'lev_money_positions_long', short: 'lev_money_positions_short', deltaLong: 'change_in_lev_money_long', deltaShort: 'change_in_lev_money_short' },
    asset_mgr: { label: 'Gestionnaires d’actifs', long: 'asset_mgr_positions_long', short: 'asset_mgr_positions_short', deltaLong: 'change_in_asset_mgr_long', deltaShort: 'change_in_asset_mgr_short' },
    dealer: { label: 'Intermédiaires / dealers', long: 'dealer_positions_long_all', short: 'dealer_positions_short_all', deltaLong: 'change_in_dealer_long_all', deltaShort: 'change_in_dealer_short_all' },
    other_rept: { label: 'Autres grands déclarants', long: 'other_rept_positions_long', short: 'other_rept_positions_short', deltaLong: 'change_in_other_rept_long', deltaShort: 'change_in_other_rept_short' },
    nonrept: { label: 'Non-déclarants', long: 'nonrept_positions_long_all', short: 'nonrept_positions_short_all', deltaLong: 'change_in_nonrept_long_all', deltaShort: 'change_in_nonrept_short_all' },
  };
  const numberFormat = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
  const svgNS = 'http://www.w3.org/2000/svg';
  const num = (value) => typeof value === 'number' && Number.isFinite(value) ? value : null;
  const byId = (id) => document.getElementById(id);
  const setText = (id, value) => { const node = byId(id); if (node) node.textContent = value; };

  function svgNode(tag, attrs = {}, text = '') {
    const node = document.createElementNS(svgNS, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
    if (text) node.textContent = text;
    return node;
  }

  function draw(points) {
    if (!svg) return;
    const width = 900, height = 290;
    const pad = { left: 58, right: 18, top: 18, bottom: 38 };
    const maxAbs = Math.max(10, ...points.map((p) => Math.abs(p.pct)));
    const bound = Math.ceil(maxAbs / 5) * 5;
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const x = (i) => pad.left + (points.length <= 1 ? plotW / 2 : i * plotW / (points.length - 1));
    const y = (pct) => pad.top + (bound - pct) * plotH / (2 * bound);
    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    for (const tick of [bound, bound / 2, 0, -bound / 2, -bound]) {
      const yPos = y(tick);
      svg.append(svgNode('line', { x1: pad.left, x2: width - pad.right, y1: yPos, y2: yPos, class: tick === 0 ? 'cot-zero' : 'cot-gridline' }));
      const label = tick > 0 ? `+${tick.toFixed(0)}%` : tick < 0 ? `−${Math.abs(tick).toFixed(0)}%` : '0%';
      svg.append(svgNode('text', { x: 8, y: yPos + 4, class: 'cot-axis-label' }, label));
    }
    if (!points.length) return;

    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(index).toFixed(2)} ${y(point.pct).toFixed(2)}`).join(' ');
    svg.append(svgNode('path', { d: path, class: 'cot-line' }));
    const group = svgNode('g', { 'aria-hidden': 'true' });
    points.forEach((point, index) => {
      const circle = svgNode('circle', {
        cx: x(index), cy: y(point.pct), r: index === points.length - 1 ? 4.5 : (points.length > 100 ? 1.8 : 2.5), class: 'cot-point',
      });
      circle.append(svgNode('title', {}, `${point.date} · net ${point.pct.toFixed(2)} % de l’intérêt ouvert · ${numberFormat.format(point.net)} contrats`));
      group.append(circle);
    });
    svg.append(group);
    svg.append(svgNode('text', { x: pad.left, y: height - 8, class: 'cot-axis-label' }, points[0].date));
    svg.append(svgNode('text', { x: width - pad.right, y: height - 8, 'text-anchor': 'end', class: 'cot-axis-label' }, points[points.length - 1].date));
  }

  function update(data) {
    const selected = marketSelect?.value ?? '';
    const [code, ...nameParts] = selected.split('|');
    const marketName = nameParts.join('|');
    const series = data.series.find((s) => s.contract_market_code === code && s.market_name === marketName);
    const category = categoryMeta[categorySelect?.value] ?? categoryMeta.lev_money;
    const observations = series?.observations ?? [];
    const range = rangeSelect?.value ?? '52';
    const limited = range === 'all' ? observations : observations.slice(-Number(range));
    const points = limited.flatMap((obs) => {
      const long = num(obs[category.long]);
      const short = num(obs[category.short]);
      const oi = num(obs.open_interest_all);
      if (long === null || short === null || oi === null || oi <= 0) return [];
      const net = long - short;
      return [{ date: obs.report_date, net, pct: net / oi * 100 }];
    });
    const latest = observations[observations.length - 1];
    const long = latest ? num(latest[category.long]) : null;
    const short = latest ? num(latest[category.short]) : null;
    const oi = latest ? num(latest.open_interest_all) : null;
    const net = long === null || short === null ? null : long - short;
    const pct = net === null || oi === null || oi <= 0 ? null : net / oi * 100;
    const dLong = latest ? num(latest[category.deltaLong]) : null;
    const dShort = latest ? num(latest[category.deltaShort]) : null;
    const netChange = dLong === null || dShort === null ? null : dLong - dShort;

    if (empty) empty.hidden = points.length > 0;
    draw(points);
    setText('cot-chart-title', series?.label ?? 'Contrat indisponible');
    setText('cot-category-label', category.label);
    setText('cot-net', net === null ? '—' : numberFormat.format(net));
    setText('cot-net-pct', pct === null ? '—' : `${pct.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} % de l’intérêt ouvert`);
    setText('cot-ls', `${long === null ? '—' : numberFormat.format(long)} / ${short === null ? '—' : numberFormat.format(short)}`);
    setText('cot-oi', oi === null ? '—' : numberFormat.format(oi));
    setText('cot-change', netChange === null ? '—' : `${netChange > 0 ? '+' : ''}${numberFormat.format(netChange)}`);
    setText('cot-range-label', range === 'all' ? 'toute la période disponible' : range === '260' ? 'jusqu’à 5 ans de rapports disponibles' : '52 derniers rapports disponibles');
    setText('cot-last-series-date', latest?.report_date ?? '—');
  }

  fetch(root.dataset.jsonUrl || '/cot-history.json', { credentials: 'same-origin' })
    .then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
    .then((data) => {
      if (!Array.isArray(data.series)) throw new Error('Invalid COT data schema');
      update(data);
      marketSelect?.addEventListener('change', () => update(data));
      categorySelect?.addEventListener('change', () => update(data));
      rangeSelect?.addEventListener('change', () => update(data));
    })
    .catch(() => { if (empty) { empty.hidden = false; empty.textContent = 'Les filtres interactifs ne sont pas disponibles pour le moment; le dernier graphique pré-généré reste affiché.'; } });
})();
