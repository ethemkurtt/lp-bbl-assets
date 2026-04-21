/* =============================================================
   LP BBL - JAVASCRIPT
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     HERO — swap bg image on mobile
     Desktop: reads original src
     Mobile:  header-bbl@2x.png (hardcoded for BBL)
     ----------------------------------------------------------- */
  (function heroBgSwap() {
    var bg = document.querySelector('.sx-hero__bg');
    if (!bg) return;
    var DESKTOP_SRC = bg.getAttribute('src');
    var MOBILE_SRC  = 'https://lp.elitklinik.com.tr/wp-content/uploads/2026/04/header-bbl@2x.png';
    function apply() {
      var isMobile = window.matchMedia('(max-width: 1024px)').matches;
      var target = isMobile ? MOBILE_SRC : DESKTOP_SRC;
      if (bg.getAttribute('src') !== target) bg.setAttribute('src', target);
    }
    apply();
    window.addEventListener('resize', apply);
  })();

});
