// Stockist finder
(function(){
  var stockistData = document.getElementById('jondo-stockist-data');
  var stockists = [];
  if (stockistData) {
    try { stockists = JSON.parse(stockistData.textContent); } catch(e) {}
  }
  if (!stockists.length) {
    stockists = [
      {name:"Ernie Els Golf",addr:"Sun City, South Africa",url:"https://www.jondosport.com"},
      {name:"Pecanwood Golf & Country Club",addr:"Hartbeespoort, South Africa",url:"https://www.jondosport.com"},
      {name:"Fancourt Golf Estate",addr:"George, South Africa",url:"https://www.jondosport.com"},
      {name:"Gary Player Country Club",addr:"Sun City, South Africa",url:"https://www.jondosport.com"},
      {name:"The Houghton Golf Club",addr:"Johannesburg, South Africa",url:"https://www.jondosport.com"},
      {name:"Leopard Creek Country Club",addr:"Malelane, South Africa",url:"https://www.jondosport.com"},
      {name:"Augusta National Pro Shop",addr:"Augusta, Georgia, USA",url:"https://www.jondosport.com"},
      {name:"GolfSmith USA",addr:"Multiple locations, USA",url:"https://www.jondosport.com"},
      {name:"Wentworth Golf Club",addr:"Virginia Water, Surrey, UK",url:"https://www.jondosport.com"},
      {name:"Royal Birkdale Golf Club",addr:"Southport, England, UK",url:"https://www.jondosport.com"},
      {name:"Emirates Golf Club",addr:"Dubai, UAE",url:"https://www.jondosport.com"},
      {name:"Royal Melbourne Golf Club",addr:"Black Rock, Victoria, Australia",url:"https://www.jondosport.com"}
    ];
  }
  var input = document.getElementById('stockist-input');
  var btn = document.getElementById('stockist-btn');
  var results = document.getElementById('stockist-results');
  var noResult = document.getElementById('stockist-no-result');
  if (!input || !btn) return;
  function doSearch(){
    var q = input.value.trim().toLowerCase();
    if (!q) return;
    var matches = stockists.filter(function(s){
      return s.name.toLowerCase().indexOf(q) !== -1 || s.addr.toLowerCase().indexOf(q) !== -1;
    });
    results.classList.toggle('active', matches.length > 0);
    noResult.classList.toggle('active', matches.length === 0);
    results.innerHTML = matches.map(function(s){
      return '<div class="stockist-result-item"><div><div class="stockist-result-name">'+s.name+'</div><div class="stockist-result-addr">'+s.addr+'</div></div><a href="'+s.url+'" class="stockist-result-link" target="_blank">Get directions &rarr;</a></div>';
    }).join('');
  }
  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', function(e){ if (e.key === 'Enter') doSearch(); });
})();

// Lens switcher
(function(){
  var img = document.getElementById('lens-img');
  var label = document.getElementById('lens-label');
  var btns = document.querySelectorAll('.lens-btn');
  if (!img || !btns.length) return;
  var lenses = ['budget','premium','krisp'];
  var labels = {'budget':'Budget Lens','premium':'Premium Brand','krisp':'KRISP Extreme'};
  var current = 2, timer;
  function setLens(idx){
    current = idx;
    var key = lenses[idx];
    img.className = 'lens-' + key;
    if (label) label.textContent = labels[key];
    btns.forEach(function(b,i){ b.classList.toggle('active', i === idx); });
  }
  function startCycle(){
    clearInterval(timer);
    timer = setInterval(function(){ setLens((current + 1) % lenses.length); }, 2800);
  }
  btns.forEach(function(btn, i){
    btn.addEventListener('click', function(){ setLens(i); clearInterval(timer); startCycle(); });
  });
  startCycle();
})();

// Video hero autoplay
var vid = document.getElementById('vid-hero-video');
if (vid) {
  vid.muted = true;
  vid.play().catch(function(){
    document.addEventListener('pointerdown', function(){ vid.play(); }, { once: true });
  });
}

// Frame grid tabs
document.querySelectorAll('.frames-tab').forEach(function(tab){
  tab.addEventListener('click', function(){
    document.querySelectorAll('.frames-tab').forEach(function(t){ t.classList.remove('active'); });
    tab.classList.add('active');
    var target = tab.dataset.tab;
    var best = document.getElementById('frames-best');
    var newArr = document.getElementById('frames-new');
    if (best) best.hidden = (target !== 'best');
    if (newArr) newArr.hidden = (target !== 'new');
  });
});

// Scrolled nav
var nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function(el){ obs.observe(el); });
}

// Sticky bottom bar
var stickyBar = document.getElementById('sticky-bar');
if (stickyBar) {
  var stickyShown = false;
  window.addEventListener('scroll', function(){
    if (!stickyShown && window.scrollY > 400) { stickyBar.classList.add('visible'); stickyShown = true; }
  }, { passive: true });
}

// Email slide-in
var emailSlide = document.getElementById('email-slidein');
if (emailSlide) {
  var slideShown = false;
  function showSlide() {
    if (!slideShown && !sessionStorage.getItem('jondo-email-dismissed')) {
      emailSlide.classList.add('visible');
      slideShown = true;
    }
  }
  setTimeout(showSlide, 45000);
  window.addEventListener('scroll', function(){
    if (!slideShown && (window.scrollY / (document.body.scrollHeight - window.innerHeight)) > 0.6) showSlide();
  }, { passive: true });
  var closeBtn = emailSlide.querySelector('.email-slidein-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(){
      emailSlide.classList.remove('visible');
      sessionStorage.setItem('jondo-email-dismissed', '1');
    });
  }
}

// Mobile nav drawer
(function(){
  var mobNav = document.getElementById('mob-nav');
  var overlay = document.getElementById('mob-nav-overlay');
  var closeBtn = document.getElementById('mob-nav-close');
  var navHamburger = document.getElementById('nav-hamburger-btn');
  var vidMenuBtn = document.getElementById('vid-menu-btn');
  if (!mobNav) return;

  function openNav(){
    mobNav.classList.add('open');
    mobNav.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeNav(){
    mobNav.classList.remove('open');
    mobNav.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  if (navHamburger) navHamburger.addEventListener('click', openNav);
  if (vidMenuBtn) vidMenuBtn.addEventListener('click', function(e){ e.preventDefault(); openNav(); });
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNav(); });
})();
