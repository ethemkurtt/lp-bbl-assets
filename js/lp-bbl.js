/* =============================================================
   LP BBL - JAVASCRIPT
   =============================================================
   Each module is wrapped in its own IIFE and only runs if its
   root element exists on the page. Add new modules as we build.
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     TOAST NOTIFICATION (utility — used later by forms, etc.)
     ----------------------------------------------------------- */
  window.bblToast = function (message, type) {
    type = type || 'success';
    var existing = document.querySelector('.bbl-toast');
    if (existing) existing.remove();

    var t = document.createElement('div');
    t.className = 'bbl-toast bbl-toast--' + type;
    t.textContent = message;
    document.body.appendChild(t);

    requestAnimationFrame(function () { t.classList.add('active'); });
    setTimeout(function () {
      t.classList.remove('active');
      setTimeout(function () { t.remove(); }, 400);
    }, 4000);
  };

  /* -----------------------------------------------------------
     HERO — swap bg image on mobile (different crop)
     Desktop: scarletx-kapak.webp (from HTML src)
     Mobile:  kapak2.png (or any mobile-specific image)
     -----------------------------------------------------------
     To use: set
       <img class="sx-hero__bg" src="DESKTOP_URL" data-mobile-src="MOBILE_URL">
     JS swaps src based on viewport.
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
