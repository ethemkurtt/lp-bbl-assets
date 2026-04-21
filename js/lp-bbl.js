/* =============================================================
   LP BBL - JAVASCRIPT
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     HERO — swap bg image on mobile (1:1 ported from scarlet)
     Reads src as desktop URL, data-mobile-src as mobile URL.
     ----------------------------------------------------------- */
  (function heroBgSwap() {
    var bg = document.querySelector('.sx-hero__bg');
    if (!bg) return;
    var desktopSrc = bg.getAttribute('src');
    var mobileSrc = bg.getAttribute('data-mobile-src') || desktopSrc;
    function apply() {
      var isMobile = window.matchMedia('(max-width: 1024px)').matches;
      var target = isMobile ? mobileSrc : desktopSrc;
      if (bg.getAttribute('src') !== target) bg.setAttribute('src', target);
    }
    apply();
    window.addEventListener('resize', apply);
  })();

});
