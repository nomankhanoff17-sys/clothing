/*
  NEEZA — MAIN.JS
  ---------------------------------------------------
  Global, page-independent behaviour only:
  - mobile navigation toggle
  - navbar shadow on scroll
  - newsletter form (frontend-only confirmation)

  Cart/wishlist counts, search, and product rendering
  live in their own dedicated files.
*/

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initNavbarScroll();
  initNewsletterForm();
  initNewArrivals();
  updateHomeCartCount();
  initSearch();
  handleProductSearch();
});

// ================= MOBILE MENU TOGGLE =================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile-menu');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('is-open');
    const isOpen = mobileMenu.classList.contains('is-open');
    toggleBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
}

// ================= NAVBAR SCROLL STATE =================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-neeza');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  });
}

// ================= NEWSLETTER FORM =================
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const note = document.querySelector('.newsletter-note');

    if (input && input.value.trim() !== '' && note) {
      note.textContent = 'Thanks for subscribing — watch your inbox.';
      input.value = '';
    }
  });
}


// ================= NEW ARRIVALS =================

function initNewArrivals() {

  const newArrivalsGrid = document.getElementById('new-arrivals-grid');

  if (!newArrivalsGrid || typeof PRODUCTS === 'undefined') {
    return;
  }

  const newArrivals = PRODUCTS.slice(0, 4);

  newArrivalsGrid.innerHTML = newArrivals.map(function (product) {

    return `
      <a href="product.html?id=${product.id}" class="product-card">

        <div class="product-image">
          <img 
            src="${product.image}" 
            alt="${product.name}"
            onerror="this.style.display='none';"
          >
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>Rs. ${Number(product.price).toLocaleString()}</p>
        </div>

      </a>
    `;

  }).join('');
}


// ================= HOME CART COUNT =================

function updateHomeCartCount() {

  const cart = JSON.parse(
    localStorage.getItem('neezaCart')
  ) || [];

  let totalQuantity = 0;

  cart.forEach(function (item) {
    totalQuantity += Number(item.quantity) || 0;
  });

  const countElements =
    document.querySelectorAll('.navbar-icon-count');

  countElements.forEach(function (element) {
    element.textContent = totalQuantity;
  });
}

// ================= SEARCH TOGGLE =================

function initSearch() {

  const searchButton =
    document.getElementById('navbarSearchButton');

  const searchBar =
    document.querySelector('.navbar-search-bar');

  const searchInput =
    document.getElementById('navbarSearchInput');

  if (!searchButton || !searchBar || !searchInput) {
    return;
  }

  searchButton.addEventListener('click', function () {

    searchBar.classList.toggle('is-open');

    if (searchBar.classList.contains('is-open')) {
      searchInput.focus();
    }

  });

}

// ================= PRODUCT SEARCH =================

function handleProductSearch() {

  const searchForm =
    document.querySelector('.navbar-search-form');

  const searchInput =
    document.getElementById('navbarSearchInput');

  if (!searchForm || !searchInput) {
    return;
  }

  searchForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const searchValue =
      searchInput.value.trim();

    if (searchValue === '') {
      return;
    }

    window.location.href =
      'shop.html?search=' +
      encodeURIComponent(searchValue);

  });

}