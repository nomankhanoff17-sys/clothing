/*
  NEEZA — WISHLIST.JS
  ---------------------------------------------------
  Loads wishlist products from localStorage.
*/

document.addEventListener('DOMContentLoaded', function () {
    renderWishlist();
    updateWishlistCount();
});


function getWishlist() {
    return JSON.parse(localStorage.getItem('neezaWishlist')) || [];
}


function renderWishlist() {

    const container = document.getElementById('wishlistContainer');
    const emptyMessage = document.getElementById('emptyWishlist');

    if (!container || !emptyMessage) {
        return;
    }

    const wishlist = getWishlist();

    if (wishlist.length === 0) {

        container.innerHTML = '';
        emptyMessage.style.display = 'block';

        return;
    }

    emptyMessage.style.display = 'none';

    container.innerHTML = wishlist.map(function (item) {

        return `
            <div class="col-lg-3 col-md-6">

                <div class="card h-100 border-0 shadow-sm">

                    <div class="position-relative">

                        <img
                            src="${item.image}"
                            class="card-img-top"
                            alt="${item.name}"
                            style="height: 320px; object-fit: cover;"
                            onerror="this.style.display='none';"
                        >

                    </div>

                    <div class="card-body">

                        <p class="text-muted small mb-1">
                            ${item.category}
                        </p>

                        <h5 class="fw-bold">
                            ${item.name}
                        </h5>

                        <p class="fw-semibold mb-3">
                            Rs. ${Number(item.price).toLocaleString()}
                        </p>

                        <div class="d-flex gap-2">

                            <a
                                href="product.html?id=${item.id}"
                                class="btn btn-dark flex-grow-1"
                            >
                                View Product
                            </a>

                            <button
                                type="button"
                                class="btn btn-outline-dark remove-wishlist"
                                data-id="${item.id}"
                                title="Remove from Wishlist"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

    }).join('');


    document.querySelectorAll('.remove-wishlist').forEach(function (button) {

        button.addEventListener('click', function () {

            const productId = Number(this.dataset.id);

            removeFromWishlist(productId);

        });

    });
}


function removeFromWishlist(productId) {

    let wishlist = getWishlist();

    wishlist = wishlist.filter(function (item) {
        return Number(item.id) !== productId;
    });

    localStorage.setItem('neezaWishlist', JSON.stringify(wishlist));

    renderWishlist();
    updateWishlistCount();
}


function updateWishlistCount() {

    const wishlist = getWishlist();

    const count = wishlist.length;

    const wishlistCountElements =
        document.querySelectorAll('.wishlist-count');

    wishlistCountElements.forEach(function (element) {
        element.textContent = count;
    });
}