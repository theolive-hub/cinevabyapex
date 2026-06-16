/* Cineva news — shared behaviour for the index and article pages.
   Detects the page: #news-river => index feed; body[data-slug] => article. Edit here once. */
(function () {
  var SVC = {
    led:    { label:'LED Volumes',       url:'../led-volumes.html',       svg:'<rect x="2" y="2" width="6" height="6"/><rect x="10" y="2" width="6" height="6"/><rect x="18" y="2" width="4" height="6"/><rect x="2" y="10" width="6" height="6"/><rect x="10" y="10" width="6" height="6"/><rect x="18" y="10" width="4" height="6"/><rect x="2" y="18" width="6" height="4"/><rect x="10" y="18" width="6" height="4"/><rect x="18" y="18" width="4" height="4"/>' },
    plates: { label:'Driving Plates',     url:'../driving-plates.html',    svg:'<path d="M5 11l2-5h10l2 5v6h-2v-2H7v2H5v-6zm2.4-1h9.2l-1.2-3H8.6L7.4 10zM8 15a1.2 1.2 0 100-2.4A1.2 1.2 0 008 15zm8 0a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/>' },
    server: { label:'Server Playback',    url:'../server-playback.html',   svg:'<rect x="3" y="3" width="18" height="5" rx="0.6"/><rect x="3" y="10" width="18" height="5" rx="0.6"/><rect x="3" y="17" width="18" height="4" rx="0.6"/>' },
    light:  { label:'Specialty Lighting', url:'../specialty-lighting.html', svg:'<path d="M12 2a7 7 0 00-4.2 12.6V18h8.4v-3.4A7 7 0 0012 2zM9 20h6v2H9z"/>' },
    remap:  { label:'Frame Remapping',    url:'../frame-remapping.html',   svg:'<rect x="2" y="5" width="13" height="10" opacity="0.45"/><rect x="9" y="9" width="13" height="10"/>' },
    turnkey:{ label:'Turnkey Support',    url:'../turnkey-support.html',   svg:'<path d="M15 2a5.5 5.5 0 00-5.1 7.6L2 17.5V22h4.5v-2h2v-2h2v-2l1.4-1.4A5.5 5.5 0 1015 2zm1.8 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>' }
  };
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); }); }
  function fmtDate(d){ try { return new Date(d + 'T00:00:00').toLocaleDateString('en-CA', { year:'numeric', month:'short', day:'numeric' }); } catch(e){ return esc(d); } }
  function badges(list){
    if (!list || !list.length) return '';
    var html = list.map(function(k){ var s = SVC[k]; if(!s) return ''; return '<a class="svc-tag" href="' + s.url + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + s.svg + '</svg>' + s.label + '</a>'; }).join('');
    return '<div class="svc-tags">' + html + '</div>';
  }
  function popItem(a){
    var thumb = a.image ? '<span class="pop-thumb"><img src="' + esc(a.image) + '" alt="" loading="lazy"></span>' : '';
    return '<li><a href="' + esc(a.slug) + '.html">' + thumb + '<span class="pop-title">' + esc(a.title) + '</span></a></li>';
  }

  /* ---------- INDEX: featured feed + working sidebar ---------- */
  function initIndex(){
    var riverEl   = document.getElementById('news-river');
    var empty     = document.getElementById('news-empty');
    var updatedEl = document.getElementById('news-updated');
    var filterEl  = document.getElementById('news-filter');
    var recentEl  = document.getElementById('news-recent');
    var popularEl = document.getElementById('news-popular');
    var searchEl  = document.getElementById('news-search');
    var ALL = [], activeSvc = 'all', query = '';

    function currentList(){
      var q = query.trim().toLowerCase();
      return ALL.filter(function(a){
        var okSvc = activeSvc === 'all' || (a.services || []).indexOf(activeSvc) >= 0;
        var okQ = !q || ((a.title || '') + ' ' + (a.dek || '') + ' ' + (a.tag || '')).toLowerCase().indexOf(q) >= 0;
        return okSvc && okQ;
      });
    }
    function rowHTML(a){
      var media = a.image ? '<a class="news-row-media" href="' + esc(a.slug) + '.html"><img src="' + esc(a.image) + '" alt="" loading="lazy"></a>' : '<span></span>';
      return '<article class="news-row">' + media +
        '<div>' +
          '<div class="row-meta"><span class="cyan">' + esc(a.tag || 'News') + '</span><span>' + fmtDate(a.date) + '</span></div>' +
          '<h3><a href="' + esc(a.slug) + '.html">' + esc(a.title) + '</a></h3>' +
          '<p class="dek">' + esc(a.dek || '') + '</p>' +
          badges(a.services) +
        '</div></article>';
    }
    function renderFeed(){
      var list = currentList();
      if (!list.length){
        riverEl.innerHTML = '';
        empty.hidden = false;
        empty.textContent = ALL.length ? 'Nothing matches that. Try another topic or clear the search.' : 'No articles published yet. Check back soon.';
        return;
      }
      empty.hidden = true;
      riverEl.innerHTML = list.map(rowHTML).join('');
    }
    function buildFilter(){
      var counts = {};
      ALL.forEach(function(a){ (a.services || []).forEach(function(k){ counts[k] = (counts[k] || 0) + 1; }); });
      var html = '<button type="button" data-svc="all" aria-pressed="' + (activeSvc === 'all' ? 'true' : 'false') + '">All <span class="cnt">' + ALL.length + '</span></button>';
      Object.keys(SVC).forEach(function(k){
        if (counts[k]) html += '<button type="button" data-svc="' + k + '" aria-pressed="' + (activeSvc === k ? 'true' : 'false') + '">' + SVC[k].label + ' <span class="cnt">' + counts[k] + '</span></button>';
      });
      filterEl.innerHTML = html;
      filterEl.querySelectorAll('button').forEach(function(b){
        b.addEventListener('click', function(){
          activeSvc = b.getAttribute('data-svc');
          filterEl.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          renderFeed();
        });
      });
    }
    function buildLists(){
      recentEl.innerHTML = ALL.slice(0, 5).map(popItem).join('');
      var pop = ALL.filter(function(a){ return a.popular != null; }).sort(function(p, q){ return (p.popular || 99) - (q.popular || 99); });
      if (!pop.length) pop = ALL.slice(0, 5);
      popularEl.innerHTML = pop.slice(0, 5).map(popItem).join('');
    }
    function wireTabs(){
      var tabs = document.querySelectorAll('.news-tab');
      tabs.forEach(function(t){
        t.addEventListener('click', function(){
          tabs.forEach(function(x){ x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
          var which = t.getAttribute('data-tab');
          recentEl.hidden = which !== 'recent';
          popularEl.hidden = which !== 'popular';
        });
      });
    }

    if (searchEl) searchEl.addEventListener('input', function(){ query = searchEl.value; renderFeed(); });

    fetch('articles.json?cb=' + Date.now())
      .then(function(r){ return r.json(); })
      .then(function(data){
        if (updatedEl && data.updated) updatedEl.textContent = 'Updated ' + fmtDate(data.updated);
        ALL = (data.articles || []).filter(function(a){ return a.visible === true; });
        ALL.sort(function(a,b){ return (b.date || '').localeCompare(a.date || ''); });
        if (!ALL.length){ empty.hidden = false; return; }
        try { var P = new URLSearchParams(location.search); var qp = P.get('q'); var tp = P.get('topic'); if (qp){ query = qp; if (searchEl) searchEl.value = qp; } if (tp && SVC[tp]) activeSvc = tp; } catch(e){}
        buildFilter();
        buildLists();
        wireTabs();
        renderFeed();
      })
      .catch(function(){ empty.hidden = false; empty.textContent = 'Could not load articles.'; });
  }

  /* ---------- ARTICLE: badges, keywords, sidebar, visibility guard ---------- */
  function initArticle(slug){
    function buildSidebar(all, currentSlug){
      var vis = all.filter(function(x){ return x.visible === true; });
      vis.sort(function(p, q){ return (q.date || '').localeCompare(p.date || ''); });
      var fEl = document.getElementById('news-filter');
      if (fEl){
        var counts = {}; vis.forEach(function(a){ (a.services || []).forEach(function(k){ counts[k] = (counts[k] || 0) + 1; }); });
        var html = '<a href="index.html">All <span style="opacity:.45">' + vis.length + '</span></a>';
        Object.keys(SVC).forEach(function(k){ if (counts[k]) html += '<a href="index.html?topic=' + k + '">' + SVC[k].label + ' <span style="opacity:.45">' + counts[k] + '</span></a>'; });
        fEl.innerHTML = html;
      }
      var others = vis.filter(function(x){ return x.slug !== currentSlug; });
      var rEl = document.getElementById('news-recent'), pEl = document.getElementById('news-popular');
      var moreSoon = '<li style="opacity:.6;padding:.6rem 0">More soon.</li>';
      if (rEl) rEl.innerHTML = others.slice(0, 5).map(popItem).join('') || moreSoon;
      if (pEl){ var pop = others.filter(function(a){ return a.popular != null; }).sort(function(p, q){ return (p.popular || 99) - (q.popular || 99); }); if (!pop.length) pop = others.slice(0, 5); pEl.innerHTML = pop.slice(0, 5).map(popItem).join('') || moreSoon; }
      var tabs = document.querySelectorAll('.news-tab');
      tabs.forEach(function(t){ t.addEventListener('click', function(){ tabs.forEach(function(x){ x.setAttribute('aria-selected', x === t ? 'true' : 'false'); }); var w = t.getAttribute('data-tab'); if (rEl) rEl.hidden = w !== 'recent'; if (pEl) pEl.hidden = w !== 'popular'; }); });
      var sEl = document.getElementById('news-search');
      if (sEl) sEl.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ var v = sEl.value.trim(); window.location = 'index.html' + (v ? ('?q=' + encodeURIComponent(v)) : ''); } });
    }

    fetch('articles.json?cb=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var a = (d.articles || []).find(function (x) { return x.slug === slug; });
        var hidden = !a || a.visible !== true;
        if (!hidden) {
          var bx = document.getElementById('article-badges');
          if (bx && a && a.services) bx.innerHTML = badges(a.services);
          var kEl = document.getElementById('article-keywords');
          if (kEl) kEl.innerHTML = '<b>Keywords:</b> ' + ((a && a.keywords && a.keywords.length) ? a.keywords.map(function(k){ return esc(k); }).join(', ') : '');
          buildSidebar(d.articles || [], slug);
          return;
        }
        var m = document.querySelector('meta[data-cineva-robots]');
        if (m) { m.setAttribute('content', 'noindex,nofollow'); }
        else { var nm = document.createElement('meta'); nm.name = 'robots'; nm.setAttribute('content', 'noindex,nofollow'); nm.setAttribute('data-cineva-robots', ''); document.head.appendChild(nm); }
        var main = document.getElementById('main');
        if (main) {
          main.innerHTML = '<section class="section"><div class="container"><p class="eyebrow">Unavailable</p>' +
            '<h1 class="display-section">This article isn\'t available right now<span class="pt">.</span></h1>' +
            '<p class="body-lg" style="margin-top:var(--s-4);max-width:60ch;">It may have been unpublished. Head back to <a href="index.html">the news index</a> for current pieces.</p></div></section>';
        }
      })
      .catch(function () {});
  }

  var slug = (document.body && document.body.getAttribute('data-slug')) || null;
  if (document.getElementById('news-river')) initIndex();
  else if (slug) initArticle(slug);
})();
