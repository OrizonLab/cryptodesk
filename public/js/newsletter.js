// Newsletter CryptoDesk — formulaire double opt-in (proxy /api/newsletter/)
// Fichier externe car la CSP du blog (script-src 'self') bloque les inline.
(function () {
  function init() {
  document.querySelectorAll('form.newsletter-form').forEach((form) => {
    const status = form.querySelector('.newsletter-status');
    const btn = form.querySelector('button[type="submit"]');
    const show = (text, type) => {
      if (!status) return;
      status.textContent = text;
      status.className = 'newsletter-status ' + (type === 'ok' ? 'ok' : 'err');
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailEl = form.querySelector('input[type="email"]');
      const email = (emailEl.value || '').trim();
      const langEl = form.querySelector('input[name="lang"]:checked, select[name="lang"]');
      const lang = langEl ? langEl.value : 'fr';
      const consent = form.querySelector('input[type="checkbox"][required]');
      if (consent && !consent.checked) {
        show('Veuillez cocher la case de consentement.', 'err');
        return;
      }
      if (btn) { btn.disabled = true; }
      try {
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, lang }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 202) {
          show('📬 Vérifiez votre boîte mail pour confirmer votre inscription.', 'ok');
          emailEl.value = '';
        } else if (res.status === 409) {
          show('Cette adresse est déjà inscrite.', 'err');
        } else if (res.status === 429) {
          show('Trop de requêtes — réessayez plus tard.', 'err');
        } else {
          show(data.error || 'Une erreur est survenue, réessayez.', 'err');
        }
      } catch {
        show('Erreur réseau — réessayez.', 'err');
      } finally {
        if (btn) { btn.disabled = false; }
      }
    });
  });
  } // fin init

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
