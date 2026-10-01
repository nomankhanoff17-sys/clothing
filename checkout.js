/*
  NEEZA — CHECKOUT.JS
  ---------------------------------------------------
  Handles:
  - Checkout cart summary
  - Subtotal
  - Shipping
  - Total
  - JazzCash payment selection
  - Checkout form validation
*/

document.addEventListener('DOMContentLoaded', function () {
  initCheckout();
});


// ================= CHECKOUT INITIALIZATION =================

function initCheckout() {
  const checkoutForm = document.getElementById('checkoutForm');

  if (!checkoutForm) {
    return;
  }

  renderCheckoutItems();
  initJazzCashPayment();
  initCheckoutForm();
}


// ================= GET CART =================

function getCheckoutCart() {
  return JSON.parse(localStorage.getItem('neezaCart')) || [];
}


// ================= RENDER CHECKOUT ITEMS =================

function renderCheckoutItems() {

  const checkoutItems =
    document.getElementById('checkoutItems');

  if (!checkoutItems) {
    return;
  }

  const cart = getCheckoutCart();

  if (cart.length === 0) {

    checkoutItems.innerHTML = `
      <div class="text-center py-4">
        <p>Your cart is empty.</p>

        <a href="shop.html"
           class="btn-neeza btn-neeza-primary">
          Continue Shopping
        </a>
      </div>
    `;

    updateCheckoutTotals(0);
    return;
  }


  checkoutItems.innerHTML = cart.map(function (item) {

    const itemTotal =
      Number(item.price) * Number(item.quantity);

    return `
      <div class="checkout-item">

        <div class="checkout-item-image">
          <img
            src="${item.image}"
            alt="${item.name}"
            onerror="this.style.display='none';"
          >
        </div>

        <div class="checkout-item-info">

          <h4>${item.name}</h4>

          <p>
            Qty: ${item.quantity}
          </p>

        </div>

        <strong>
          Rs. ${itemTotal.toLocaleString()}
        </strong>

      </div>
    `;

  }).join('');


  calculateCheckoutTotals(cart);
}


// ================= CALCULATE TOTALS =================

function calculateCheckoutTotals(cart) {

  let subtotal = 0;

  cart.forEach(function (item) {

    subtotal +=
      Number(item.price) * Number(item.quantity);

  });

  updateCheckoutTotals(subtotal);
}


// ================= UPDATE TOTALS =================

function updateCheckoutTotals(subtotal) {

  const shipping =
    subtotal > 0
      ? (subtotal >= 5000 ? 0 : 250)
      : 0;

  const total = subtotal + shipping;


  const subtotalElement =
    document.getElementById('checkoutSubtotal');

  const shippingElement =
    document.getElementById('checkoutShipping');

  const totalElement =
    document.getElementById('checkoutTotal');


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


// ================= JAZZCASH PAYMENT =================

function initJazzCashPayment() {

  const jazzCash =
    document.getElementById('jazzcash');

  if (jazzCash) {

    jazzCash.checked = true;

  }
}


// ================= CHECKOUT FORM =================

function initCheckoutForm() {

  const checkoutForm =
    document.getElementById('checkoutForm');

  if (!checkoutForm) {
    return;
  }


  checkoutForm.addEventListener('submit', function (e) {

    e.preventDefault();


    const cart = getCheckoutCart();


    if (cart.length === 0) {

      alert('Your cart is empty.');

      window.location.href = 'shop.html';

      return;
    }


    // ================= CUSTOMER DATA =================

    const firstName =
      document.getElementById('firstName')?.value.trim();

    const lastName =
      document.getElementById('lastName')?.value.trim();

    const email =
      document.getElementById('email')?.value.trim();

    const phone =
      document.getElementById('phone')?.value.trim();

    const address =
      document.getElementById('address')?.value.trim();

    const city =
      document.getElementById('city')?.value.trim();

    const postalCode =
      document.getElementById('postalCode')?.value.trim();


    // ================= BASIC VALIDATION =================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city
    ) {

      alert('Please fill in all required fields.');

      return;
    }


    // ================= PAYMENT =================

    const jazzCash =
      document.getElementById('jazzcash');


    if (!jazzCash || !jazzCash.checked) {

      alert('Please select JazzCash as your payment method.');

      return;
    }


    // ================= ORDER DATA =================

    const order = {

      orderId:
        'NEEZA-' +
        Date.now(),

      customer: {

        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        postalCode: postalCode

      },

      paymentMethod: 'JazzCash',

      items: cart,

      date:
        new Date().toISOString()

    };


    // Save temporary order

    localStorage.setItem(
      'neezaLastOrder',
      JSON.stringify(order)
    );


    // Empty cart after checkout

    localStorage.removeItem('neezaCart');


    // Update navbar cart count

    updateCheckoutCartCount();


    // ================= SUCCESS MESSAGE =================

    alert(
      'Order placed successfully! Your payment method is JazzCash.'
    );


    window.location.href = 'index.html';

  });
}


// ================= NAVBAR CART COUNT =================

function updateCheckoutCartCount() {

  const countElements =
    document.querySelectorAll('.navbar-icon-count');


  countElements.forEach(function (element) {

    element.textContent = '0';

  });
}