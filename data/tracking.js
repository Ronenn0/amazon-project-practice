import { cart } from "./cart.js";
import { getProductById, dateToString } from "./general.js";

function changeCartQuantityElement() {
    const cartQuantity = document.querySelector('.cart-quantity');
    cartQuantity.textContent = cart.totalQuantity();
}


function updateHTML() {
    const mainHTMLContainer = document.querySelector('.main');
    const params = new URLSearchParams(window.location.search);

    //get the values
    const productId = params.get('productId');
    const orderTime = params.get('orderTime');
    const estimatedDeliveryTime = params.get('estimatedDeliveryTime');
    const quantity = params.get('quantity');
    const product = getProductById(productId);
    const estimatedDate = dateToString(estimatedDeliveryTime);
    const progressBarWidth = getProgressBarWidth(orderTime, estimatedDeliveryTime);

    let progressLabelRightStatus;
    progressLabelRightStatus = progressBarWidth <= 49 ? 'preparing' : progressBarWidth <= 99 ? 'shipped' : 'delivered';

    mainHTMLContainer.innerHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${estimatedDate}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label ${progressLabelRightStatus == 'preparing' ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label ${progressLabelRightStatus == 'shipped' ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label ${progressLabelRightStatus == 'delivered' ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar" style="width: ${progressBarWidth}%"></div>
      </div>
    </div>
    `;

}

function getProgressBarWidth(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const today = new Date();

    const daysToArive = convertFromMsToDays(date2 - date1);
    const passedDays = convertFromMsToDays(today - date1);

    const percentage = (passedDays / daysToArive) * 100;
    // console.log('days to arive: ' + daysToArive);
    // console.log('passed days: ' + passedDays);
    // console.log('percentage: ' + percentage);
    // const progressBar = document.querySelector('.js-progress-bar');
    return percentage;

}

function convertFromMsToDays(ms) {
    return Math.abs(ms) / 1000 / 60 / 60 / 24;
}


changeCartQuantityElement();
updateHTML();