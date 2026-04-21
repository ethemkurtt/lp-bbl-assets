/* =============================================================
   LP BBL - JAVASCRIPT
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     Universal IMG swap — any element with data-mobile-src attribute
     Desktop: uses src
     Mobile (≤1024px): swaps to data-mobile-src
     ----------------------------------------------------------- */
  (function imgSwap() {
    var HERO_MOBILE = 'https://lp.elitklinik.com.tr/wp-content/uploads/2026/04/header-bbl@2x.png';

    // Hero bg
    var heroBg = document.querySelector('.sx-hero__bg');
    if (heroBg && !heroBg.getAttribute('data-mobile-src')) {
      heroBg.setAttribute('data-mobile-src', HERO_MOBILE);
    }

    // All imgs with data-mobile-src
    var imgs = document.querySelectorAll('img[data-mobile-src]');
    imgs.forEach(function (img) {
      if (!img.getAttribute('data-desktop-src')) {
        img.setAttribute('data-desktop-src', img.getAttribute('src'));
      }
    });

    function apply() {
      var isMobile = window.matchMedia('(max-width: 1024px)').matches;
      document.querySelectorAll('img[data-mobile-src]').forEach(function (img) {
        var desktop = img.getAttribute('data-desktop-src');
        var mobile = img.getAttribute('data-mobile-src');
        var target = isMobile ? mobile : desktop;
        if (img.getAttribute('src') !== target) img.setAttribute('src', target);
      });
    }
    apply();
    window.addEventListener('resize', apply);
  })();

});
