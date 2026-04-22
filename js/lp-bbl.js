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
    var BENEFITS_DESKTOP = 'https://lp.elitklinik.com.tr/wp-content/uploads/2026/04/bbl-lazer.webp';
    var BENEFITS_MOBILE  = 'https://lp.elitklinik.com.tr/wp-content/uploads/2026/04/bbl-lazer-1.webp';

    // Hero bg
    var heroBg = document.querySelector('.sx-hero__bg');
    if (heroBg && !heroBg.getAttribute('data-mobile-src')) {
      heroBg.setAttribute('data-mobile-src', HERO_MOBILE);
    }

    // Benefits image — force desktop src + mobile swap
    var benefitsImg = document.querySelector('.sx-benefits__image');
    if (benefitsImg) {
      benefitsImg.setAttribute('src', BENEFITS_DESKTOP);
      benefitsImg.setAttribute('data-desktop-src', BENEFITS_DESKTOP);
      benefitsImg.setAttribute('data-mobile-src', BENEFITS_MOBILE);
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

  /* -----------------------------------------------------------
     Process video — click to play YouTube short inline
     ----------------------------------------------------------- */
  (function sxProcessVideo() {
    var VIDEO_ID = '0QiXZq4EW1M';
    var wrap = document.querySelector('.sx-process__video');
    if (!wrap) return;
    wrap.style.cursor = 'pointer';
    wrap.addEventListener('click', function () {
      if (wrap.querySelector('iframe')) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + VIDEO_ID + '?autoplay=1&rel=0&playsinline=1';
      iframe.setAttribute('title', 'BBL Lazer Süreci');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0';
      iframe.style.display = 'block';
      // Clear thumbnail + play overlay, insert iframe
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    });
  })();

  /* -----------------------------------------------------------
     Mobile reviews slider with pagination dots
     ----------------------------------------------------------- */
  (function sxReviewsSlider() {
    if (!window.matchMedia('(max-width: 1024px)').matches) return;
    var track = document.querySelector('.sx-reviews__rows');
    if (!track) return;
    var cards = track.querySelectorAll('.sx-review-card');
    if (!cards.length) return;

    // Flatten: move all cards out of their .sx-reviews__row wrappers
    var rows = track.querySelectorAll('.sx-reviews__row');
    rows.forEach(function (row) {
      while (row.firstChild) track.appendChild(row.firstChild);
      row.remove();
    });
    cards = track.querySelectorAll('.sx-review-card');

    // Create dots
    var dots = document.createElement('div');
    dots.className = 'sx-reviews__dots';
    var reviewsSection = track.closest('.sx-reviews');
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'sx-reviews__dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', function () {
        var card = cards[i];
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      });
      dots.appendChild(dot);
    });
    reviewsSection.appendChild(dots);

    var dotEls = dots.querySelectorAll('.sx-reviews__dot');
    var scrollTimer;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var scrollLeft = track.scrollLeft;
        var closestIdx = 0;
        var minDist = Infinity;
        cards.forEach(function (card, i) {
          var dist = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
          if (dist < minDist) { minDist = dist; closestIdx = i; }
        });
        dotEls.forEach(function (d, i) {
          d.classList.toggle('active', i === closestIdx);
        });
      }, 80);
    });
  })();

});
