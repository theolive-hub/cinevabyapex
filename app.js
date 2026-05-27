/* ============================================================
   Cineva by Apex Sound & Light — shared site behavior
   Single source of truth for nav toggle, the "What We Do"
   dropdown (keyboard + touch), and the scroll-reveal animation.
   Linked by every page as <script src="app.js" defer>.
   ============================================================ */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- "What We Do" dropdown: keyboard- and touch-accessible ----
     Desktop pointer users still get the CSS :hover behaviour.
     CSS :focus-within reveals the menu for keyboard users.
     On touch (no hover), the first tap opens the menu instead of
     immediately navigating; a second tap follows the link. */
  var dropdown = document.querySelector('.nav-dropdown');
  var trigger = dropdown ? dropdown.querySelector('.nav-dropdown-trigger') : null;
  if (dropdown && trigger) {
    var setOpen = function (open) {
      dropdown.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    var noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
    trigger.addEventListener('click', function (e) {
      if (noHover && !dropdown.classList.contains('is-open')) {
        e.preventDefault();
        setOpen(true);
      }
    });

    // Keep aria-expanded in sync with keyboard focus.
    dropdown.addEventListener('focusin', function () {
      trigger.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('focusout', function () {
      // Defer so document.activeElement is updated.
      window.setTimeout(function () {
        if (!dropdown.contains(document.activeElement)) {
          trigger.setAttribute('aria-expanded', 'false');
        }
      }, 0);
    });

    // Close on Escape or an outside click/tap.
    dropdown.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setOpen(false);
        trigger.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        setOpen(false);
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          window.setTimeout(function () {
            e.target.classList.add('is-visible');
          }, i * 40);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
