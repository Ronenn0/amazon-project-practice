import { cart } from "./cart.js";
import { loadProductsFetch, products } from "./products.js";
import { getProductById, dateToString } from "./general.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function changeCartQuantityElement() {
    const cartQuantity1 = document.querySelector('.cart-quantity');
    cartQuantity1.textContent = cart.totalQuantity();
}
if (!window.location.pathname.endsWith('checkout.html')) {
    await loadProductsFetch();
    console.log(555);
    changeCartQuantityElement();
    displayOrders();
    console.log(orders);
}



function displayOrders() {
    const ordersGrid = document.querySelector('.js-orders-grid');
    let HTML = '';
    orders.forEach(order => {

        HTML += `
        <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateToString(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(order.totalCostCents / 100).toFixed(2)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">

            ${getProductsHTML(order, order.products)}
          
        </div>
      </div>
    `;
    });
    ordersGrid.innerHTML = HTML;

}

function getProductsHTML(order, ps) {
    // console.log(ps);

    let productsHTML = '';
    ps.forEach(p => {

        const product = getProductById(p.productId);
        productsHTML += `
        <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dateToString(p.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
              Quantity: ${p.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?productId=${p.productId}&estimatedDeliveryTime=${p.estimatedDeliveryTime}&quantity=${p.quantity}&orderTime=${order.orderTime}">
              <button class="track-package-button button-secondary js-track-package">
                Track package
              </button>
            </a>
          </div>
        `;
    });
    // console.log(order.orderTime);
    return productsHTML;
}


document.querySelectorAll('.js-buy-again').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.dataset.productId);
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == btn.dataset.productId) {
                cart.addToCart(i, 1);
                changeCartQuantityElement();
            }
        }
    })
});