import { cart } from "../data/cart.js";

import { products, loadProducts } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


// import '../data/car.js';
// import '../data/backend-practice.js';

const orderSummaryContainer = document.querySelector('.order-summary');

function displayCheckoutGrid() {
  // cart = new Cart();
  orderSummaryContainer.innerHTML = '';
  cart.cartItems.forEach((item) => {
    const product = products[item.index];
    const { id, image, name } = product;
    const { quantity } = item;
    const html = `
    <div class="cart-item-container" data-item-index="${item.index}">
          <div class="delivery-date">
            
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${name}
              </div>
              <div class="product-price">
                $${product.getPrice(true, true)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary" data-item-index="${item.index}">
                  Update
                </span>
                <input class="quantity-input" type="number" data-item-index="${item.index}" value="${quantity}">
                <span class="save-quantity-link link-primary" data-item-index="${item.index}">Save</span>
                <span class="delete-quantity-link link-primary" data-item-index="${item.index}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${id}" data-item-index="${item.index}" data-price="0" data-days="9">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${id}" data-item-index="${item.index}" data-price="4.99" data-days="3">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${id}" data-item-index="${item.index}" data-price="9.99" data-days="1">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
    orderSummaryContainer.innerHTML += html;
  });

  const paymentSummaryContainer = document.querySelector('.payment-summary')
  paymentSummaryContainer.innerHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="items-quantity"></div>
            <div class="payment-summary-money total-items-cost">$</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money shipping-handling-cost">$</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money cost-before-tax">$</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money estimated-tax">$</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money total-cost">$</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`;

  displayDeliveryOptionsRadios();
  addClickEventListenersToCartItemContainerButtons();
  updatePage();
}

function displayDeliveryOptionsRadios() {
  const deliveryOptionsRadios = document.querySelectorAll('.cart-item-container .delivery-option-input');
  deliveryOptionsRadios.forEach(radio => {
    const index = radio.dataset.itemIndex;
    const price = Number(radio.dataset.price);

    displayShippingDate(radio);
    cart.cartItems.forEach(item => {
      // console.log(index, item.index);
      // console.log(price, item.shippingHandlingCost);
      if (item.index == index && price == item.shippingHandlingCost) {
        radio.checked = true;
        displayCurrentDelivery(radio);
      }
    });


    radio.addEventListener('change', () => {
      displayCurrentDelivery(radio);
      updatePage();
    });
  });
}

function addClickEventListenersToCartItemContainerButtons() {
  deleteItemButtonEventListener();
  updateQuantityButtonEventListener();
  saveQuantityButtonEventListener();
}

function deleteItemButtonEventListener() {
  const deleteItemButtons = document.querySelectorAll('.delete-quantity-link');
  deleteItemButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.itemIndex;
      // cart = cart.filter(item => item.index != index);
      for (let i = 0; i < cart.cartItems.length; i++) {
        const item = cart.cartItems[i];
        if (item.index == index) {
          cart.cartItems.splice(i, 1);
          break;
        }
      }
      // displayCheckoutGrid();
      cart.saveCart();
      const container = getCartItemContainer(index);
      container.remove();
      updatePage();
    });
  });
}

function updateQuantityButtonEventListener() {
  const updateItemButtons = document.querySelectorAll('.update-quantity-link');
  updateItemButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.itemIndex;
      const cartItemContainer = getCartItemContainer(index);
      //console.log(cartItemContainer);
      const quantityLabel = cartItemContainer.querySelector('.quantity-label');
      quantityLabel.classList.add('hidden');
      // cartItemContainer.classList.add('is-editing-quantity');
      const quantityInput = btn.nextElementSibling;
      const saveButton = quantityInput.nextElementSibling;
      quantityInput.classList.add('visible');
      saveButton.classList.add('visible');
      btn.classList.add('hidden');
    });
  });
}

function saveQuantityButtonEventListener() {
  const saveQuantityButtons = document.querySelectorAll('.save-quantity-link');
  saveQuantityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.itemIndex;
      const cartItemContainer = getCartItemContainer(index);
      //console.log(cartItemContainer);
      const quantityLabel = cartItemContainer.querySelector('.quantity-label');
      quantityLabel.classList.remove('hidden');
      // cartItemContainer.classList.add('is-editing-quantity');
      const quantityInput = cartItemContainer.querySelector('.quantity-input');
      const updateButton = cartItemContainer.querySelector('.update-quantity-link');
      const saveButton = quantityInput.nextElementSibling;
      quantityInput.classList.remove('visible');
      saveButton.classList.remove('visible');
      updateButton.classList.remove('hidden');

      for (let i = 0; i < cart.cartItems.length; i++) {
        const item = cart.cartItems[i];
        if (item.index == index) {
          item.quantity = Number(quantityInput.value);
          quantityLabel.textContent = item.quantity;
          cart.saveCart();
          updatePage();
          break;
        }
      }
    });
  });
}

function displayShippingDate(radio) {
  const parent = radio.parentElement; // .delivery-option
  const deliveryOptionDate = parent.querySelector('.delivery-option-date');
  const deliveryTime = Number(radio.dataset.days); //in days
  const today = dayjs();
  let deliveryDate = today.add(deliveryTime, 'days');
  const deliveryDay = deliveryDate.format('dddd');
  // console.log(deliveryDay);

  //No shipping in weekends
  const addDays = deliveryDay == 'Saturday' ? 2 : deliveryDay == 'Saturday' ? 1 : 0;
  deliveryDate = deliveryDate.add(addDays, 'days');

  const deliveryDateFormated = deliveryDate.format('dddd, MMMM D');

  radio.dataset.date = deliveryDateFormated;
  deliveryOptionDate.textContent = ` ${deliveryDateFormated} `;

  // console.log(deliveryOptionDate);
}

function getCartItemContainer(index) {
  return document.querySelector(`.cart-item-container[data-item-index="${index}"]`);
}

function displayCurrentDelivery(radio) {
  const index = radio.dataset.itemIndex;
  const shippingHandlingCost = Number(radio.dataset.price);
  cart.cartItems.forEach(item => {
    if (item.index == index) {
      item.shippingHandlingCost = shippingHandlingCost;
      cart.saveCart();
    }
  });
  const cartItemContainer = getCartItemContainer(index);
  const deliveryDateElement = cartItemContainer.querySelector('.delivery-date');


  const deliveryDate = radio.dataset.date;
  deliveryDateElement.textContent = 'Delivery date: ' + deliveryDate;
}


function shippingHandlingCost() {
  let cost = 0;
  const deliveryOptions = document.querySelectorAll('.delivery-option');
  deliveryOptions.forEach(option => {
    const input = option.querySelector('.delivery-option-input')
    const checked = input.checked;
    if (!checked) return;
    const priceText = option.querySelector('.delivery-option-price').textContent;
    if (priceText.includes('FREE')) {
      return;
    }
    if (priceText.includes('4.99')) {
      cost += 4.99;
    } else if (priceText.includes('9.99')) {
      cost += 9.99;
    }
  });
  return cost.toFixed(2);
}

function updatePage() {
  const itemsQuantityLink = document.querySelector('.return-to-home-link');
  itemsQuantityLink.textContent = cart.totalQuantity() + ' items';

  const itemsQuantityElement = document.querySelector('.items-quantity');
  itemsQuantityElement.textContent = `Items (${cart.totalQuantity()}):`;

  const totalItemsCostElement = document.querySelector('.total-items-cost');
  totalItemsCostElement.textContent = '$' + itemsCost();

  const totalShippingHandlingCostElement = document.querySelector('.shipping-handling-cost');
  totalShippingHandlingCostElement.textContent = '$' + shippingHandlingCost();

  const costBeforeTaxElement = document.querySelector('.cost-before-tax');
  costBeforeTaxElement.textContent = '$' + totalCostBeforeTax();

  const estimatedTaxElement = document.querySelector('.estimated-tax');
  estimatedTaxElement.textContent = '$' + estimatedTax();

  const totalCostElement = document.querySelector('.total-cost');
  totalCostElement.textContent = '$' + totalCost();
}
function itemsCost() {
  return cart.cartItems.reduce((acc, item) => acc + products[item.index].getPrice(false) * item.quantity, 0).toFixed(2);
}

function totalCostBeforeTax() {
  return (Number(itemsCost()) + Number(shippingHandlingCost())).toFixed(2);
}

function estimatedTax() {
  return (Number(totalCostBeforeTax()) * 0.1).toFixed(2);
}

function totalCost() {
  return (Number(totalCostBeforeTax()) + Number(estimatedTax())).toFixed(2);
}
loadProducts(displayCheckoutGrid);