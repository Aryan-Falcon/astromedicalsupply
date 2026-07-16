// Astro Medical Supply & Equipment — shared behavior

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Catalog filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.item-card');
  function applyFilter(cat) {
    items.forEach(function (item) {
      if (cat === 'all' || item.getAttribute('data-category') === cat) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  }
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter(btn.getAttribute('data-filter'));
      });
    });
    // If arriving via a link like catalog.html#respiratory, pre-select that tab
    var hash = window.location.hash.replace('#', '');
    if (hash) {
      var match = document.querySelector('.filter-btn[data-filter="' + hash + '"]');
      if (match) {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        match.classList.add('active');
        applyFilter(hash);
        setTimeout(function () {
          var bar = document.querySelector('.filter-bar');
          if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
