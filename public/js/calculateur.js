// Calculateur « coût réel d'un achat crypto » — CryptoDesk
// Fichier externe (CSP script-src 'self'). Calcul 100% côté navigateur.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#cost-calculator');
  if (!form) return;

  const fees = JSON.parse(form.dataset.fees || '{}');
  const btcPrice = parseFloat(form.dataset.btcPrice || '0');
  const ethPrice = parseFloat(form.dataset.ethPrice || '0');
  const resultsEl = document.getElementById('calc-results');

  const fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
  const fmtPct = (v) => (v == null ? '—' : v.toFixed(2) + ' %');
  const fmtBtc = (v) => (v == null ? '—' : v.toFixed(6) + ' BTC');

  function netFor(p, amount, method, asset, withdraw) {
    const f = p.fees;
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
    return { p, lines, net, totalFees, pct: amount > 0 ? (totalFees / amount) * 100 : 0 };
  }

  function run() {
    const amount = parseFloat(form.amount.value || '0');
    const method = form.method.value;
    const asset = form.asset.value;
    const withdraw = form.withdraw.value;
    if (!amount || amount <= 0) {
      resultsEl.innerHTML = '<p class="calc-empty">Entrez un montant pour voir le coût réel par plateforme.</p>';
      return;
    }
    const rows = [];
    Object.entries(fees.platforms || {}).forEach(([key, f]) => {
      const r = netFor(key, amount, method, asset, withdraw);
      if (!r) return;
      rows.push(r);
    });
    rows.sort((a, b) => a.totalFees - b.totalFees);

    const best = rows[0];
    let html = '<div class="calc-best">Le moins coûteux pour ce scénario : <strong>' + best.p.name + '</strong> — ' +
      fmt(best.totalFees) + ' de frais (' + best.pct.toFixed(1) + ' %), soit ' + fmt(best.net) + ' de crypto nette.</div>';
    html += '<div class="calc-list">';
    rows.forEach((r) => {
      const p = r.p;
      html += '<div class="calc-row' + (r === best ? ' best' : '') + '">';
      html += '<div class="calc-row-head"><strong>' + p.name + '</strong><span>' + fmt(r.net) + ' nets</span></div>';
      html += '<ul class="calc-detail">';
      r.lines.forEach((l) => {
        html += '<li><span>' + l.label + '</span><span>' + (typeof l.value === 'number' ? fmt(l.value) : l.value) + '</span></li>';
      });
      html += '<li class="calc-total"><span>Total des frais</span><span>' + fmt(r.totalFees) + ' (' + r.pct.toFixed(1) + ' %)</span></li>';
      html += '</ul>';
      const link = fees.links && fees.links[key];
      if (link) {
        html += '<a class="calc-cta" href="' + link.url + '" target="_blank" rel="noopener sponsored nofollow" data-umami-event="affiliate-click" data-umami-event-affiliate="' + link.umami + '">' + link.cta + ' →</a>';
      }
      html += '<p class="calc-note">' + (p.note || '') + '</p>';
      html += '</div>';
    });
    html += '</div>';
    html += '<p class="calc-disclaimer">Estimations indicatives (frais vérifiés le ' + (fees.updated || '?') + '). Les frais réels varient selon le marché, la méthode et le moment. Consultez les sites officiels.</p>';
    resultsEl.innerHTML = html;
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  form.addEventListener('change', run);
  run();
});
