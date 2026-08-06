// CryptoDesk — scripts globaux (menu mobile + bandeau de langue)
// Fichier EXTERNE (public/js/main.js) : la CSP du blog bloque les scripts
// inline (script-src 'self' sans unsafe-inline), donc le JS doit être servi
// comme fichier statique du même domaine.

(function () {
  'use strict';

  // ── Menu mobile (burger) ─────────────────────────────────────
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.classList.remove('nav-open');
      })
    );
  }

  // ── Bandeau de langue : propose l'autre langue selon le navigateur
  //    (PAS de redirection auto — meilleur SEO)
  const altLink = document.querySelector('link[rel="alternate"][hreflang]');
  const altHref = altLink ? altLink.getAttribute('href') : null;
  const pageLang = document.documentElement.lang || 'fr';
  if (altHref) {
    const navLang = (navigator.language || '').toLowerCase().slice(0, 2);
    const wantsOther = pageLang === 'fr' ? navLang === 'en' : navLang === 'fr';
    if (wantsOther) {
      const banner = document.createElement('div');
      banner.className = 'lang-banner';
      banner.innerHTML =
        pageLang === 'fr'
          ? '🌐 This article is available in <a href="' + altHref + '" hreflang="en">English →</a>'
          : '🌐 Cet article est disponible en <a href="' + altHref + '" hreflang="fr">français →</a>';
      document.body.prepend(banner);
    }
  }
})();
