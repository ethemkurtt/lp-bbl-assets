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
     SECTION MODULES — added as we build
     ----------------------------------------------------------- */

  // Example pattern:
  // (function bblHeader() {
  //   var el = document.querySelector('.bbl-header');
  //   if (!el) return;
  //   // ... handlers
  // })();

});
