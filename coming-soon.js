/* ============================================================
   Cineva by Apex Sound & Light — Coming Soon gate
   ------------------------------------------------------------
   THE SWITCH is the COMING_SOON line below.
     true  = whole site shows the coming-soon splash
     false = site is live as normal
   Flip it, save, push. That is the entire toggle.

   Loaded synchronously in <head> on every page (before any
   content paints) so the real site never flashes before the
   splash. A private ?preview link lets you see the real site;
   both the locked site and the preview are marked noindex.
   ============================================================ */
(function () {
  'use strict';

  /* ▼▼▼  THE SWITCH  ▼▼▼ */
  var COMING_SOON = false;
  /* ▲▲▲  set to false to go live  ▲▲▲ */

  if (!COMING_SOON) return;

  var head = document.head || document.documentElement;

  function addRobotsNoindex() {
    var m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    head.appendChild(m);
  }

  /* ---- Private preview bypass ----
     Visit any page with ?preview once; it's remembered for this
     browser session so you can click through the real site.
     Preview views are noindex so the bypass is never indexed. */
  var isPreview = false;
  try {
    if (/[?&]preview(=|&|$)/i.test(location.search)) {
      sessionStorage.setItem('cineva-preview', '1');
    }
    isPreview = sessionStorage.getItem('cineva-preview') === '1';
  } catch (e) { /* storage blocked -> treat as public */ }

  if (isPreview) {
    addRobotsNoindex();
    return; /* show the real site */
  }

  /* ---- Locked: hide the real page immediately (flash-free) ---- */
  addRobotsNoindex();
  var hide = document.createElement('style');
  hide.textContent =
    'html.cs-active{background:#141518}' +
    'html.cs-active body{display:none!important}';
  head.appendChild(hide);
  document.documentElement.className += ' cs-active';

  var CSS =
    '#cineva-cs{position:fixed;inset:0;z-index:2147483647;display:flex;' +
    'align-items:center;justify-content:center;box-sizing:border-box;padding:6vw;' +
    'text-align:center;color:#DDDFE5;background:#141518;' +
    'background-image:radial-gradient(62% 82% at 50% 0%,rgba(56,182,217,0.15),rgba(20,21,24,0) 70%);' +
    'font-family:"Archivo","Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;}' +
    '#cineva-cs .cs-inner{max-width:640px;width:100%;}' +
    '#cineva-cs .cs-logo{height:62px;width:auto;display:block;margin:0 auto 2.4rem;' +
    'filter:brightness(0) invert(1);}' +
    '#cineva-cs .cs-eyebrow{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;' +
    'text-transform:uppercase;letter-spacing:0.34em;font-size:13px;color:#38B6D9;margin:0 0 1rem;}' +
    '#cineva-cs .cs-tag{font-size:clamp(30px,5.4vw,52px);line-height:1.05;font-weight:800;' +
    'letter-spacing:-0.01em;color:#fff;margin:0 0 1.4rem;}' +
    '#cineva-cs .cs-copy{font-size:clamp(15px,2.2vw,18px);line-height:1.6;color:#C5C8D0;' +
    'max-width:52ch;margin:0 auto 2.2rem;}' +
    '#cineva-cs .cs-contact{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;' +
    'font-size:14px;color:#90939C;letter-spacing:0.02em;margin:0;}' +
    '#cineva-cs .cs-contact a{color:#DDDFE5;text-decoration:none;' +
    'border-bottom:1px solid rgba(56,182,217,0.5);padding-bottom:2px;' +
    'transition:color .18s ease,border-color .18s ease;}' +
    '#cineva-cs .cs-contact a:hover{color:#5FC6E2;border-color:#5FC6E2;}' +
    '#cineva-cs .cs-dot{color:#4F525A;margin:0 .6rem;}' +
    '@media(max-width:520px){#cineva-cs .cs-logo{height:50px;margin-bottom:1.8rem;}' +
    '#cineva-cs .cs-dot{display:block;height:.5rem;visibility:hidden;margin:0;}}';

  var HTML =
    '<div class="cs-inner">' +
      '<img class="cs-logo" src="/assets/cineva-lockup.svg" ' +
        'alt="Cineva by Apex Sound & Light" width="1065" height="286">' +
      '<p class="cs-eyebrow">Coming soon</p>' +
      '<h1 class="cs-tag">On set. On time. On Budget.</h1>' +
      '<p class="cs-copy">The Cineva by Apex Sound &amp; Light site is getting its ' +
        'final pass. Need a volume, driving plates, or specialty lighting for a shoot? ' +
        'Reach us direct.</p>' +
      '<p class="cs-contact">' +
        '<a href="mailto:hello@cinevabyapex.com">hello@cinevabyapex.com</a>' +
        '<span class="cs-dot">&middot;</span>' +
        '<a href="tel:+18665112739">1-866-511-2739</a>' +
      '</p>' +
    '</div>';

  function build() {
    var style = document.createElement('style');
    style.textContent = CSS;
    head.appendChild(style);
    var ov = document.createElement('div');
    ov.id = 'cineva-cs';
    ov.setAttribute('role', 'main');
    ov.innerHTML = HTML;
    document.documentElement.appendChild(ov);
    try { document.title = 'Cineva by Apex Sound & Light, coming soon'; } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
