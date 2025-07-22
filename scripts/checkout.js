import { cart, totalQuantity, saveCart } from "../data/cart.js";
import { products } from "../data/products.js";

const orderSummaryContainer = document.querySelector('.order-summary');

function displayCheckoutGrid() {
    orderSummaryContainer.innerHTML = '';
    cart.forEach((item) => {
        const product = products[item.index];
        const { shippingHandlingCost, id, image, name, priceCents } = product;
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
                $${(priceCents / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
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
                <input type="radio" class="delivery-option-input" name="delivery-option-${id}" data-item-index="${item.index}" data-value="0" data-date="Tuesday, June 21">
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
                <input type="radio" class="delivery-option-input" name="delivery-option-${id}" data-item-index="${item.index}" data-value="4.99" data-date="Wednesday, June 15">
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
                <input type="radio" class="delivery-option-input" name="delivery-option-${id}" data-item-index="${item.index}" data-value="9.99" data-date="Monday, June 13">
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

    const deliveryOptionsRadios = document.querySelectorAll('.cart-item-container .delivery-option-input');
    deliveryOptionsRadios.forEach(radio => {
        const index = radio.dataset.itemIndex;
        const value = Number(radio.dataset.value);

        cart.forEach(item => {
            // console.log(index, item.index);
            // console.log(value, item.shippingHandlingCost);
            if (item.index == index && value == item.shippingHandlingCost) {
                radio.checked = true;
                displayCurrentDelivery(radio);
            }
        });


        radio.addEventListener('change', () => {
            displayCurrentDelivery(radio);
            updatePage();
        });
    });

    const deleteItemButtons = document.querySelectorAll('.delete-quantity-link');
    deleteItemButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.itemIndex;
            // cart = cart.filter(item => item.index != index);
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                if (item.index == index) {
                    cart.splice(i, 1);
                    break;
                }
            }
            // displayCheckoutGrid();
            saveCart();
            const container = document.querySelector(`.cart-item-container[data-item-index="${index}"`);
            container.remove();
            updatePage();
        });
    });
    updatePage();
}

function displayCurrentDelivery(radio) {
    const index = radio.dataset.itemIndex;
    const shippingHandlingCost = radio.dataset.value;
    cart.forEach(item => {
        if (item.index == index) {
            item.shippingHandlingCost = Number(shippingHandlingCost);
            saveCart();
        }
    });
    const cartItemContainer = document.querySelector(`.cart-item-container[data-item-index="${radio.dataset.itemIndex}"]`);
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
displayCheckoutGrid();

function updatePage() {
    const itemsQuantityLink = document.querySelector('.return-to-home-link');
    itemsQuantityLink.textContent = totalQuantity() + ' items';

    const itemsQuantityElement = document.querySelector('.items-quantity');
    itemsQuantityElement.textContent = `Items (${totalQuantity()}):`;

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
    return cart.reduce((acc, item) => acc + products[item.index].priceCents / 100 * item.quantity, 0).toFixed(2);
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