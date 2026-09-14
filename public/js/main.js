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
      // Construction par API DOM (pas d'innerHTML) : altHref vient du document,
      // mais le texte reste inerte et l'URL passe par setAttribute.
      const banner = document.createElement('div');
      banner.className = 'lang-banner';
      const link = document.createElement('a');
      if (pageLang === 'fr') {
        banner.append('🌐 This article is available in ');
        link.setAttribute('hreflang', 'en');
        link.textContent = 'English →';
      } else {
        banner.append('🌐 Cet article est disponible en ');
        link.setAttribute('hreflang', 'fr');
        link.textContent = 'français →';
      }
      link.setAttribute('href', altHref);
      banner.append(link);
      document.body.prepend(banner);
    }
  }

  // ── Boutons « copier le lien » ───────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-share-copy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const status = btn.parentElement
          ? btn.parentElement.querySelector('.share-status')
          : null;
        const url = btn.getAttribute('data-share-url') || '';
        navigator.clipboard.writeText(url).then(
          () => {
            if (status) status.textContent = 'Lien copié';
          },
          () => {
            if (status) status.textContent = 'Copie impossible';
          }
        );
      });
    });
  });
})();
