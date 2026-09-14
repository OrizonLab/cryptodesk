// Calculateur « coût réel d'un achat crypto » — CryptoDesk
// Fichier externe (CSP script-src 'self'). Calcul 100% côté navigateur.
(function () {
  function init() {
  const form = document.querySelector('#cost-calculator');
  if (!form) return;

  const fees = JSON.parse(form.dataset.fees || '{}');
  const btcPrice = parseFloat(form.dataset.btcPrice || '0');
  const ethPrice = parseFloat(form.dataset.ethPrice || '0');
  const resultsEl = document.getElementById('calc-results');

  const fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });

  // Fabrique d'éléments : le rendu passe par l'API DOM (textContent /
  // setAttribute) plutôt que par innerHTML — aucune chaîne HTML concaténée.
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function netFor(f, amount, method, asset, withdraw) {
    if (f.card_pct == null) return null; // pas d'achat fiat (DeFi)
    const fiatPct = method === 'card' ? f.card_pct : f.transfer_pct;
    if (fiatPct == null) return null;

    let remaining = amount;
    const lines = [];
    const feeFiat = (remaining * fiatPct) / 100;
    lines.push({ label: 'Frais de dépôt (' + (method === 'card' ? 'carte' : 'virement') + ')', value: feeFiat });
    remaining -= feeFiat;

    const feeTrade = (remaining * (f.trading_pct || 0)) / 100;
    lines.push({ label: 'Frais de trading', value: feeTrade });
    remaining -= feeTrade;

    const feeSpread = (remaining * (f.spread_pct || 0)) / 100;
    lines.push({ label: 'Spread estimé', value: feeSpread });
    remaining -= feeSpread;

    if (withdraw === 'wallet') {
      let feeWithdraw = 0;
      const unitPrice = asset === 'eth' ? ethPrice : btcPrice;
      const feeCoin = asset === 'eth' ? f.withdrawal_eth_eth : f.withdrawal_btc_btc;
      if (feeCoin != null && unitPrice > 0) {
        feeWithdraw = feeCoin * unitPrice;
        lines.push({ label: 'Frais de retrait (' + (asset === 'eth' ? 'ETH' : 'BTC') + ')', value: feeWithdraw });
        remaining -= feeWithdraw;
      } else {
        lines.push({ label: 'Frais de retrait', value: 'n/a' });
      }
    }

    const net = Math.max(0, remaining);
    const totalFees = amount - net;
    return { p: f, lines, net, totalFees, pct: amount > 0 ? (totalFees / amount) * 100 : 0 };
  }

  function run() {
    const amount = parseFloat(form.elements.namedItem('amount').value || '0');
    const method = form.elements.namedItem('method').value;
    const asset = form.elements.namedItem('asset').value;
    const withdraw = form.elements.namedItem('withdraw').value;
    if (!amount || amount <= 0) {
      resultsEl.replaceChildren(el('p', 'calc-empty', 'Entrez un montant pour voir le coût réel par plateforme.'));
      return;
    }
    const rows = [];
    Object.entries(fees.platforms || {}).forEach(([key, f]) => {
      const r = netFor(f, amount, method, asset, withdraw);
      if (!r) return;
      rows.push(Object.assign({ key: key }, r));
    });
    rows.sort((a, b) => a.totalFees - b.totalFees);

    const best = rows[0];
    if (!best) {
      resultsEl.replaceChildren(el('p', 'calc-empty', 'Aucune plateforme ne couvre ce scénario pour le moment.'));
      return;
    }

    const bestEl = el('div', 'calc-best');
    bestEl.append(
      'Le moins coûteux pour ce scénario : ',
      el('strong', null, best.p.name),
      ' — ' + fmt.format(best.totalFees) + ' de frais (' + best.pct.toFixed(1) + ' %), soit ' +
        fmt.format(best.net) + ' de crypto nette.'
    );

    const list = el('div', 'calc-list');
    rows.forEach((r) => {
      const p = r.p;
      const row = el('div', 'calc-row' + (r === best ? ' best' : ''));

      const head = el('div', 'calc-row-head');
      head.append(el('strong', null, p.name), el('span', null, fmt.format(r.net) + ' nets'));
      row.append(head);

      const detail = el('ul', 'calc-detail');
      r.lines.forEach((l) => {
        const li = el('li');
        li.append(
          el('span', null, l.label),
          el('span', null, typeof l.value === 'number' ? fmt.format(l.value) : l.value)
        );
        detail.append(li);
      });
      const total = el('li', 'calc-total');
      total.append(
        el('span', null, 'Total des frais'),
        el('span', null, fmt.format(r.totalFees) + ' (' + r.pct.toFixed(1) + ' %)')
      );
      detail.append(total);
      row.append(detail);

      const link = fees.links && fees.links[r.key];
      if (link) {
        const cta = el('a', 'calc-cta', link.cta + ' →');
        cta.setAttribute('href', link.url);
        cta.setAttribute('target', '_blank');
        cta.setAttribute('rel', 'noopener sponsored nofollow');
        cta.dataset.umamiEvent = 'affiliate-click';
        cta.dataset.umamiEventAffiliate = link.umami;
        row.append(cta);
      }

      row.append(el('p', 'calc-note', p.note || ''));
      list.append(row);
    });

    const disclaimer = el(
      'p',
      'calc-disclaimer',
      'Estimations indicatives (frais vérifiés le ' + (fees.updated || '?') +
        '). Les frais réels varient selon le marché, la méthode et le moment. Consultez les sites officiels.'
    );

    resultsEl.replaceChildren(bestEl, list, disclaimer);
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  form.addEventListener('change', run);
  try {
    run();
  } catch (err) {
    console.error('calculateur:', err);
  }
  } // fin init

  // Bootstrap immédiat : le script est en fin de body, le formulaire existe déjà.
  // (Garde anti-double-exécution si DOMContentLoaded se déclenche aussi.)
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    init();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  }
  boot();
})();
