/*
  NEEZA — CART.JS
  ---------------------------------------------------
  Handles:
  - Cart products
  - Quantity controls
  - Remove product
  - Subtotal
  - Shipping
  - Total
  - Navbar cart count
*/

document.addEventListener('DOMContentLoaded', function () {
  initCart();
});


// ================= CART INITIALIZATION =================

function initCart() {
  renderCart();
  updateCartCount();
}


// ================= GET CART =================

function getCart() {
  return JSON.parse(localStorage.getItem('neezaCart')) || [];
}


// ================= SAVE CART =================

function saveCart(cart) {
  localStorage.setItem('neezaCart', JSON.stringify(cart));
}


// ================= RENDER CART =================

function renderCart() {

  const cartContainer = document.getElementById('cartItems');

  if (!cartContainer) {
    return;
  }

  const cart = getCart();

  if (cart.length === 0) {

    cartContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="fa-solid fa-bag-shopping mb-3"
           style="font-size: 2rem;"></i>

        <h3>Your cart is empty</h3>

        <p class="mb-4">
          Looks like you haven't added anything yet.
        </p>

        <a href="shop.html"
           class="btn-neeza btn-neeza-primary">
          Continue Shopping
        </a>
      </div>
    `;

    updateTotals(0);
    return;
  }


  cartContainer.innerHTML = cart.map(function (item) {

    const itemTotal = Number(item.price) * Number(item.quantity);

    return `
      <div class="cart-item">

        <div class="cart-item-image">
          <img
            src="${item.image}"
            alt="${item.name}"
            onerror="this.style.display='none';"
          >
        </div>

        <div class="cart-item-info">

          <h3>${item.name}</h3>

          <p>
            Rs. ${Number(item.price).toLocaleString()}
          </p>

          <div class="cart-quantity">

            <button
              type="button"
              class="quantity-btn btn btn-outline-dark btn-sm"
              data-action="decrease"
              data-id="${item.id}">
              −
            </button>

            <span>${item.quantity}</span>

            <button
              type="button"
              class="quantity-btn btn btn-outline-dark btn-sm"
              data-action="increase"
              data-id="${item.id}">
              +
            </button>

          </div>

        </div>

        <div class="cart-item-right">

          <strong>
            Rs. ${itemTotal.toLocaleString()}
          </strong>

          <button
            type="button"
            class="remove-cart-item btn btn-outline-dark btn-sm"
            data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
            Remove
          </button>

        </div>

      </div>
    `;

  }).join('');


  // ================= QUANTITY BUTTONS =================

  const quantityButtons =
    cartContainer.querySelectorAll('.quantity-btn');

  quantityButtons.forEach(function (button) {

    button.addEventListener('click', function () {

      const productId = Number(button.dataset.id);
      const action = button.dataset.action;

      updateQuantity(productId, action);
    });

  });


  // ================= REMOVE BUTTONS =================

  const removeButtons =
    cartContainer.querySelectorAll('.remove-cart-item');

  removeButtons.forEach(function (button) {

    button.addEventListener('click', function () {

      const productId = Number(button.dataset.id);

      removeFromCart(productId);
    });

  });


  calculateTotals(cart);
}


// ================= UPDATE QUANTITY =================

function updateQuantity(productId, action) {

  const cart = getCart();

  const product = cart.find(function (item) {
    return item.id === productId;
  });

  if (!product) {
    return;
  }

  if (action === 'increase') {
    product.quantity += 1;
  }

  if (action === 'decrease') {
    product.quantity -= 1;
  }

  if (product.quantity <= 0) {
    const updatedCart = cart.filter(function (item) {
      return item.id !== productId;
    });

    saveCart(updatedCart);

  } else {

    saveCart(cart);
  }

  renderCart();
  updateCartCount();
}


// ================= REMOVE FROM CART =================

function removeFromCart(productId) {

  let cart = getCart();

  cart = cart.filter(function (item) {
    return item.id !== productId;
  });

  saveCart(cart);

  renderCart();
  updateCartCount();
}


// ================= CALCULATE TOTALS =================

function calculateTotals(cart) {

  let subtotal = 0;

  cart.forEach(function (item) {

    subtotal +=
      Number(item.price) * Number(item.quantity);

  });

  updateTotals(subtotal);
}


// ================= UPDATE TOTALS =================

function updateTotals(subtotal) {

  const shipping =
    subtotal > 0
      ? (subtotal >= 5000 ? 0 : 250)
      : 0;

  const total = subtotal + shipping;


  const subtotalElement =
    document.getElementById('cartSubtotal');

  const shippingElement =
    document.getElementById('cartShipping');

  const totalElement =
    document.getElementById('cartTotal');


  if (subtotalElement) {
    subtotalElement.textContent =
      `Rs. ${subtotal.toLocaleString()}`;
  }

  if (shippingElement) {

    shippingElement.textContent =
      shipping === 0
        ? 'FREE'
        : `Rs. ${shipping.toLocaleString()}`;

  }

  if (totalElement) {
    totalElement.textContent =
      `Rs. ${total.toLocaleString()}`;
  }
}


// ================= NAVBAR CART COUNT =================

function updateCartCount() {

  const cart =
    getCart();

  let totalItems = 0;

  cart.forEach(function (item) {

    totalItems +=
      Number(item.quantity) || 0;

  });


  const countElements =
    document.querySelectorAll('.navbar-icon-count');

  countElements.forEach(function (element) {

    element.textContent = totalItems;

  });
}