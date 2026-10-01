/*
  NEEZA — NAVBAR.JS
  ---------------------------------------------------
  Loads the same navbar on every page.
*/

document.addEventListener('DOMContentLoaded', function () {

  const navbarContainer = document.getElementById('navbar');

  if (!navbarContainer) {
    return;
  }

  navbarContainer.innerHTML = `
    
    <nav class="navbar-neeza">

      <div class="container-neeza">

        <div class="navbar-inner">

          <!-- LOGO -->
          <a href="index.html" class="navbar-logo">
            NEEZA
          </a>


          <!-- DESKTOP NAVIGATION -->
          <div class="navbar-links">

            <a href="index.html">Home</a>
            <a href="shop.html">Shop</a>
            <a href="tshirts.html">T-Shirts</a>
            <a href="shirts.html">Shirts</a>
            <a href="trousers.html">Trousers</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>

          </div>


          <!-- NAVBAR ACTIONS -->
          <div class="navbar-actions">

            <!-- SEARCH -->
            <button type="button"
                    class="navbar-action-btn"
                    id="navbarSearchButton"
                    title="Search">

              <i class="fa-solid fa-magnifying-glass"></i>

            </button>


            <!-- WISHLIST -->
            <a href="wishlist.html"
               class="navbar-action-btn"
               title="Wishlist">

              <i class="fa-regular fa-heart"></i>

            </a>


            <!-- CART -->
            <a href="cart.html"
               class="navbar-action-btn"
               title="Cart">

              <i class="fa-solid fa-bag-shopping"></i>

              <span class="navbar-icon-count">0</span>

            </a>


            <!-- MOBILE MENU -->
            <button type="button"
                    class="navbar-toggle"
                    aria-label="Open Menu">

              <i class="fa-solid fa-bars"></i>

            </button>

          </div>

        </div>


        <!-- MOBILE MENU -->
        <div class="navbar-mobile-menu">

          <a href="index.html">Home</a>
          <a href="shop.html">Shop</a>
          <a href="tshirts.html">T-Shirts</a>
          <a href="shirts.html">Shirts</a>
          <a href="trousers.html">Trousers</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <a href="wishlist.html">Wishlist</a>
          <a href="cart.html">Cart</a>

        </div>

      </div>

    </nav>


    <!-- SEARCH BAR -->

    <div class="navbar-search-bar">

      <div class="container-neeza">

        <form class="navbar-search-form">

          <input
            type="text"
            id="navbarSearchInput"
            placeholder="Search products..."
            autocomplete="off"
          >

          <button type="submit" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

        </form>

      </div>

    </div>

  `;


  /* ================= CART COUNT ================= */

  updateNavbarCartCount();


  function updateNavbarCartCount() {

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


 });