/*
  NEEZA — FOOTER.JS
  ---------------------------------------------------
  Loads the same footer on every page.
*/

document.addEventListener('DOMContentLoaded', function () {

  const footerContainer = document.getElementById('footer');

  if (!footerContainer) {
    return;
  }

  footerContainer.innerHTML = `

    <footer class="footer-neeza">

      <div class="container-neeza">

        <div class="footer-grid">

          <!-- BRAND -->
          <div class="footer-brand">

            <a href="index.html" class="navbar-logo">
              NEEZA
            </a>

            <p>
              Modern menswear designed for everyday confidence,
              comfort and effortless style.
            </p>

            <div class="footer-social">

              <a href="#" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
              </a>

              <a href="#" aria-label="WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>

              <a href="#" aria-label="TikTok">
                <i class="fa-brands fa-tiktok"></i>
              </a>

            </div>

          </div>


          <!-- SHOP -->
          <div class="footer-col">

            <h4>SHOP</h4>

            <ul>

              <li>
                <a href="shop.html">All Products</a>
              </li>

              <li>
                <a href="tshirts.html">T-Shirts</a>
              </li>

              <li>
                <a href="shirts.html">Shirts</a>
              </li>

              <li>
                <a href="trousers.html">Trousers</a>
              </li>

            </ul>

          </div>


          <!-- HELP -->
          <div class="footer-col">

            <h4>HELP</h4>

            <ul>

              <li>
                <a href="contact.html">Contact Us</a>
              </li>

              <li>
                <a href="cart.html">Shopping Cart</a>
              </li>

              <li>
                <a href="wishlist.html">Wishlist</a>
              </li>

              <li>
                <a href="checkout.html">Checkout</a>
              </li>

            </ul>

          </div>


          <!-- COMPANY -->
          <div class="footer-col">

            <h4>COMPANY</h4>

            <ul>

              <li>
                <a href="about.html">About NEEZA</a>
              </li>

              <li>
                <a href="index.html">New Arrivals</a>
              </li>

            </ul>

          </div>

        </div>


        <!-- BOTTOM -->

        <div class="footer-bottom">

          <p>
            © 2026 NEEZA. All rights reserved.
          </p>

        </div>

      </div>

    </footer>

  `;

});