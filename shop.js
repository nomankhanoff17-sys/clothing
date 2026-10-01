/*
  NEEZA — SHOP.JS
  ---------------------------------------------------
  Handles:
  - Product rendering
  - Product sorting
  - Shop page product display
*/

document.addEventListener('DOMContentLoaded', function () {
  initShop();
});

function initShop() {
  const productContainer = document.getElementById('productContainer');
  const sortSelect = document.getElementById('sortProducts');

  if (!productContainer || typeof PRODUCTS === 'undefined') {
    return;
  }

   let products = [...PRODUCTS];

const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get('search');

const searchInput =
  document.getElementById('navbarSearchInput');

if (searchInput && searchValue) {
  searchInput.value = searchValue;
}

if (searchValue) {

  const searchWords = searchValue
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  products = PRODUCTS.filter(function (product) {

    const productText = (
      product.name + ' ' +
      product.category + ' ' +
      product.description
    ).toLowerCase();

    return searchWords.every(function (word) {
      return productText.includes(word);
    });

  });

}

renderProducts(products);

if (sortSelect) {

  sortSelect.addEventListener('change', function () {

    let sortedProducts = [...products];

    switch (sortSelect.value) {

      case 'low':
        sortedProducts.sort(function (a, b) {
          return a.price - b.price;
        });
        break;

      case 'high':
        sortedProducts.sort(function (a, b) {
          return b.price - a.price;
        });
        break;

      case 'name':
        sortedProducts.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
        break;

      default:
        sortedProducts = [...products];
    }

    renderProducts(sortedProducts);

  });

}

}


// ================= RENDER PRODUCTS =================

function renderProducts(products) {
  const productContainer = document.getElementById('productContainer');

  if (!productContainer) {
    return;
  }

  if (products.length === 0) {
    productContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>No products found</h3>
        <p>There are no products available right now.</p>
      </div>
    `;
    return;
  }

  productContainer.innerHTML = products.map(function (product) {

    const badge = product.badge
      ? `<span class="badge-neeza ${product.badge === 'SALE' ? 'badge-sale' : ''}">
           ${product.badge}
         </span>`
      : '';

    const oldPrice = product.oldPrice
      ? `<span class="old-price">
           Rs. ${Number(product.oldPrice).toLocaleString()}
         </span>`
      : '';

    return `
      <div class="col-12 col-sm-6 col-lg-3">

        <a href="product.html?id=${product.id}" class="product-card">

          <div class="product-image position-relative">

            ${badge}

            <img
              src="${product.image}"
              alt="${product.name}"
              onerror="this.style.display='none';"
            >

          </div>

          <div class="product-info">

            <h3>${product.name}</h3>

            <p>
              Rs. ${Number(product.price).toLocaleString()}
              ${oldPrice}
            </p>

          </div>

        </a>

      </div>
    `;
  }).join('');
}