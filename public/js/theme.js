// Sélecteur de thème CryptoDesk : clair / sombre / système.
// Fichier externe chargé SYNCHRONE dans <head> (CSP script-src 'self' bloque
// les inline) — applique le thème avant le premier rendu (anti-FOUC).
(function () {
  var KEY = 'cd-theme';
  var THEMES = ['dark', 'light', 'system'];
  var ICONS = { dark: '🌙', light: '☀️', system: '🖥️' };
  var LABELS = { dark: 'Thème sombre', light: 'Thème clair', system: 'Thème système' };

  function current() {
    try {
      var v = localStorage.getItem(KEY);
      if (v && THEMES.indexOf(v) !== -1) return v;
    } catch (e) {}
    return 'system';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      meta.setAttribute('content', dark ? '#0b0e14' : '#f8fafc');
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', LABELS[theme]);
      btn.textContent = ICONS[theme];
    });
  }

  function cycle() {
    var next = THEMES[(THEMES.indexOf(current()) + 1) % THEMES.length];
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  }

  apply(current());

  // Suit l'OS quand le thème est « système »
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (current() === 'system') apply('system');
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-theme-toggle]');
    if (btn) cycle();
  });
})();
