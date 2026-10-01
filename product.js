/*
  NEEZA — PRODUCT.JS
  ---------------------------------------------------
  Handles:
  - Single product display
  - Quantity
  - Add to cart
  - Wishlist
*/

// ================= PRODUCT PAGE =================

document.addEventListener('DOMContentLoaded', function () {
  initProductPage();
});

function initProductPage() {

  const productDetails = document.getElementById('productDetails');

  if (!productDetails || typeof PRODUCTS === 'undefined') {
    return;
  }

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = Number(urlParams.get('id'));

  // Find product
  const product = PRODUCTS.find(function (item) {
    return item.id === productId;
  });

  // Product not found
  if (!product) {
    productDetails.innerHTML = `
      <div class="text-center py-5">
        <h2>Product Not Found</h2>
        <p>Sorry, this product is not available.</p>
        <a href="shop.html" class="btn-neeza btn-neeza-primary mt-3">
          Back To Shop
        </a>
      </div>
    `;
    return;
  }

  displayProduct(product);
}


// ================= DISPLAY PRODUCT =================

function displayProduct(product) {

  const productImage = document.getElementById('productImage');
  const productCategory = document.getElementById('productCategory');
  const productName = document.getElementById('productName');
  const productPrice = document.getElementById('productPrice');
  const productDescription = document.getElementById('productDescription');
  const quantityInput = document.getElementById('quantity');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const wishlistBtn = document.getElementById('wishlistBtn');

  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name;
  }

  if (productCategory) {
    productCategory.textContent = product.category;
  }

  if (productName) {
    productName.textContent = product.name;
  }

  if (productPrice) {

    let priceHTML = `Rs. ${Number(product.price).toLocaleString()}`;

    if (product.oldPrice) {
      priceHTML += `
        <span class="old-price">
          Rs. ${Number(product.oldPrice).toLocaleString()}
        </span>
      `;
    }

    productPrice.innerHTML = priceHTML;
  }

  if (productDescription) {
    productDescription.textContent = product.description;
  }

  // ================= SIZES =================

  const sizeContainer = document.getElementById('productSizes');

  if (sizeContainer) {

    sizeContainer.innerHTML = product.sizes.map(function (size) {
      return `
        <button
          type="button"
          class="size-option"
          data-size="${size}">
          ${size}
        </button>
      `;
    }).join('');

    const sizeButtons = sizeContainer.querySelectorAll('.size-option');

    sizeButtons.forEach(function (button) {

      button.addEventListener('click', function () {

        sizeButtons.forEach(function (btn) {
          btn.classList.remove('selected');
        });

        button.classList.add('selected');
      });

    });
  }

  // ================= COLORS =================

  const colorContainer = document.getElementById('productColors');

  if (colorContainer) {

    colorContainer.innerHTML = product.colors.map(function (color) {
      return `
        <button
          type="button"
          class="color-option"
          data-color="${color}">
          ${color}
        </button>
      `;
    }).join('');

    const colorButtons = colorContainer.querySelectorAll('.color-option');

    colorButtons.forEach(function (button) {

      button.addEventListener('click', function () {

        colorButtons.forEach(function (btn) {
          btn.classList.remove('selected');
        });

        button.classList.add('selected');
      });

    });
  }

  // ================= QUANTITY =================

  if (quantityInput) {

    quantityInput.addEventListener('change', function () {

      let quantity = parseInt(quantityInput.value);

      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
      }

      if (quantity > 10) {
        quantity = 10;
      }

      quantityInput.value = quantity;
    });
  }


  // ================= ADD TO CART =================

  if (addToCartBtn) {

    addToCartBtn.addEventListener('click', function () {

      let quantity = quantityInput
        ? parseInt(quantityInput.value) || 1
        : 1;

      let cart = JSON.parse(localStorage.getItem('neezaCart')) || [];

      const existingProduct = cart.find(function (item) {
        return item.id === product.id;
      });

      if (existingProduct) {

        existingProduct.quantity += quantity;

      } else {

        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        });

      }

      localStorage.setItem('neezaCart', JSON.stringify(cart));

      addToCartBtn.textContent = 'Added To Cart ✓';

      updateCartCount();

      setTimeout(function () {
        addToCartBtn.textContent = 'Add To Cart';
      }, 1500);
    });
  }


  // ================= WISHLIST =================

  if (wishlistBtn) {

    wishlistBtn.addEventListener('click', function () {

      let wishlist =
        JSON.parse(localStorage.getItem('neezaWishlist')) || [];

      const alreadyAdded = wishlist.some(function (item) {
        return item.id === product.id;
      });

      if (alreadyAdded) {

        wishlist = wishlist.filter(function (item) {
          return item.id !== product.id;
        });

        wishlistBtn.innerHTML =
          '<i class="fa-regular fa-heart"></i> Add To Wishlist';

      } else {

        wishlist.push({
  id: product.id,
  name: product.name,
  category: product.category,
  price: product.price,
  image: product.image
});

        wishlistBtn.innerHTML =
          '<i class="fa-solid fa-heart"></i> Added To Wishlist';
      }

      localStorage.setItem(
        'neezaWishlist',
        JSON.stringify(wishlist)
      );
    });
  }

  updateCartCount();
}


// ================= CART COUNT =================

function updateCartCount() {

  const cartCountElements =
    document.querySelectorAll('.navbar-icon-count');

  const cart =
    JSON.parse(localStorage.getItem('neezaCart')) || [];

  let totalItems = 0;

  cart.forEach(function (item) {
    totalItems += Number(item.quantity) || 0;
  });

  cartCountElements.forEach(function (element) {
    element.textContent = totalItems;
  });
}