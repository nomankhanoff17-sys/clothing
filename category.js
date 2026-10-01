/*
  NEEZA — CATEGORY.JS
  ---------------------------------------------------
  Handles product display for:
  - T-Shirts
  - Shirts
  - Trousers
*/

document.addEventListener('DOMContentLoaded', function () {
  initCategoryPage();
});

function initCategoryPage() {
  const productContainer = document.getElementById('productContainer');

  if (!productContainer || typeof PRODUCTS === 'undefined') {
    return;
  }

  // Get category from the current page
  const page = window.location.pathname.toLowerCase();

  let category = '';

  if (page.includes('tshirts')) {
    category = 'T-Shirts';
  } else if (page.includes('shirts')) {
    category = 'Shirts';
  } else if (page.includes('trousers')) {
    category = 'Trousers';
  }

  if (!category) {
    return;
  }

  // Get products belonging to this category
  const categoryProducts = PRODUCTS.filter(function (product) {
    return product.category === category;
  });

  renderCategoryProducts(categoryProducts);
}


// ================= RENDER CATEGORY PRODUCTS =================

function renderCategoryProducts(products) {
  const productContainer = document.getElementById('productContainer');

  if (!productContainer) {
    return;
  }

  if (products.length === 0) {
    productContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>No products found</h3>
        <p>There are currently no products in this category.</p>
      </div>
    `;
    return;
  }

  productContainer.innerHTML = products.map(function (product) {

    const badge = product.badge
      ? `
        <span class="badge-neeza ${product.badge === 'SALE' ? 'badge-sale' : ''}">
          ${product.badge}
        </span>
      `
      : '';

    const oldPrice = product.oldPrice
      ? `
        <span class="old-price">
          Rs. ${Number(product.oldPrice).toLocaleString()}
        </span>
      `
      : '';

    return `
      <div class="col-12 col-sm-6 col-lg-4">

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