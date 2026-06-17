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
  var SHARE_ICONS = {
    linkedin: '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
    facebook: '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z"/>',
    threads: '<path d="M17.2 11.15c-.1-.05-.2-.1-.31-.14-.18-3.41-2.07-5.37-5.25-5.39h-.04c-1.9 0-3.49.81-4.46 2.29l1.75 1.2c.73-1.1 1.87-1.33 2.71-1.33h.03c1.05 0 1.84.3 2.36.9.37.42.62 1.01.74 1.75a13.3 13.3 0 00-3.02-.14c-3.03.17-4.98 1.94-4.85 4.39.07 1.24.69 2.31 1.75 3 .9.58 2.06.87 3.26.8 1.59-.09 2.84-.69 3.73-1.79.66-.83 1.09-1.92 1.28-3.27.78.47 1.35 1.09 1.67 1.83.54 1.24.57 3.28-1.09 4.94-1.45 1.45-3.2 2.08-5.85 2.1-2.94-.02-5.16-.96-6.59-2.8C2.97 17.5 2.28 15.07 2.25 12c.03-3.07.72-5.5 2.06-7.21 1.43-1.84 3.65-2.78 6.59-2.8 2.96.02 5.22.97 6.71 2.81.73.91 1.29 2.05 1.65 3.38l2.04-.55c-.43-1.63-1.12-3.04-2.05-4.2C17.39 1.16 14.6.02 11.91 0h-.01C9.21.02 6.46.97 4.69 3.06 3.12 4.92 2.3 7.51 2.27 10.74v.02c.03 3.23.85 5.82 2.42 7.68C6.46 20.53 9.21 21.48 11.9 21.5h.01c2.39-.02 4.07-.65 5.46-2.04 1.81-1.81 1.76-4.08 1.16-5.48-.43-1-1.25-1.81-2.36-2.36zm-5.05 4.73c-1.33.07-2.71-.52-2.78-1.81-.05-.95.68-2.02 2.86-2.14.25-.02.49-.02.73-.02.79 0 1.53.08 2.2.22-.25 3.12-1.71 3.68-3.01 3.75z"/>',
    email: '<path d="M2 5.5A1.5 1.5 0 013.5 4h17A1.5 1.5 0 0122 5.5v13a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-13zM4.3 6l7.7 4.8L19.7 6H4.3zM20 7.7l-8 5-8-5V18h16V7.7z"/>',
    copy: '<path d="M9 2h9a2 2 0 012 2v12h-2V4H9V2zM6 6h9a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2zm0 2v12h9V8H6z"/>'
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
      var base = others.length ? others : vis;  /* fall back to all visible so the lists never read empty on a one-article site */
      var rEl = document.getElementById('news-recent'), pEl = document.getElementById('news-popular');
      var moreSoon = '<li style="opacity:.6;padding:.6rem 0">More soon.</li>';
      if (rEl) rEl.innerHTML = base.slice(0, 5).map(popItem).join('') || moreSoon;
      if (pEl){ var pop = base.filter(function(a){ return a.popular != null; }).sort(function(p, q){ return (p.popular || 99) - (q.popular || 99); }); if (!pop.length) pop = base.slice(0, 5); pEl.innerHTML = pop.slice(0, 5).map(popItem).join('') || moreSoon; }
      var sEl = document.getElementById('news-search');
      if (sEl) sEl.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ var v = sEl.value.trim(); window.location = 'index.html' + (v ? ('?q=' + encodeURIComponent(v)) : ''); } });
    }

    function buildShare(){
      var host = document.getElementById('article-share');
      if (!host){
        var bx = document.getElementById('article-badges');
        if (!bx || !bx.parentNode) return;
        host = document.createElement('div');
        host.id = 'article-share';
        host.className = 'article-share';
        bx.parentNode.insertBefore(host, bx.nextSibling);
      }
      var canon = document.querySelector('link[rel="canonical"]');
      var url = (canon && canon.href) || location.href;
      var tEl = document.querySelector('meta[property="og:title"]');
      var title = (tEl && tEl.getAttribute('content')) || document.title;
      var u = encodeURIComponent(url), t = encodeURIComponent(title), tu = encodeURIComponent(title + ' ' + url);
      function svg(p){ return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
      function link(href, label, icon){ return '<a class="share-btn" href="' + href + '" target="_blank" rel="noopener" aria-label="' + label + '">' + svg(icon) + '</a>'; }
      host.innerHTML = '<span class="share-label">Share</span>'
        + link('https://www.linkedin.com/sharing/share-offsite/?url=' + u, 'Share on LinkedIn', SHARE_ICONS.linkedin)
        + link('https://www.facebook.com/sharer/sharer.php?u=' + u, 'Share on Facebook', SHARE_ICONS.facebook)
        + link('https://www.threads.net/intent/post?text=' + tu, 'Share on Threads', SHARE_ICONS.threads)
        + '<a class="share-btn" href="mailto:?subject=' + t + '&body=' + u + '" aria-label="Share by email">' + svg(SHARE_ICONS.email) + '</a>'
        + '<button type="button" class="share-btn is-copy" aria-label="Copy link">' + svg(SHARE_ICONS.copy) + '</button>';
      var copyBtn = host.querySelector('.is-copy');
      if (copyBtn) copyBtn.addEventListener('click', function(){
        function done(){ copyBtn.classList.add('copied'); copyBtn.setAttribute('aria-label', 'Link copied'); setTimeout(function(){ copyBtn.classList.remove('copied'); copyBtn.setAttribute('aria-label', 'Copy link'); }, 1800); }
        if (navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done, done); }
        else { try { var ta = document.createElement('textarea'); ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); } catch(e){} done(); }
      });
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
          buildShare();
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
