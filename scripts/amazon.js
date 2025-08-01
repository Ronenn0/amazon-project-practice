
import { cart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';



// const products = [
//     {
//         image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//         rating: {
//             stars: 4.5,
//             count: 87
//         },
//         priceCents: 1090
//     },
//     {
//         image: "images/products/intermediate-composite-basketball.jpg",
//         name: "Intermediate Size Basketball",
//         rating: {
//             stars: 4.0,
//             count: 127
//         },
//         priceCents: 2095
//     },
//     {
//         image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//         name: "Adults Plain Cotton T-Shirt - 2 Pack",
//         rating: {
//             stars: 4.5,
//             count: 56
//         },
//         priceCents: 799
//     }
// ];

const productsGrid = document.querySelector('.products-grid');

displayCartQuantity();

function renderProductsHTML(productsToRender) {
  if (!productsToRender) productsToRender = products;
  let productsHTML = '';
  productsToRender.forEach((product, i) => {
    productsHTML += `
      <div class="product-container" data-product-index="${i}">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsURL()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice(true)}
        </div>

        <div class="product-quantity-container">
          <select class="quantity" data-product-index="${i}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
          ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-index="${i}">
          Add to Cart
        </button>
      </div>
      `;
    // productsGrid.innerHTML += html;
  });
  productsGrid.innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      //console.log(button.getAttribute('index'));
      const index = button.dataset.productIndex;
      const quantity = Number(document.querySelector(`.quantity[data-product-index="${index}"`).value);
      cart.addToCart(index, quantity);
      displayCartQuantity();
    });
  });

}

function displayCartQuantity(quantity) {
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (quantity) {
    cartQuantityElement.textContent = Number(cartQuantityElement.textContent) + quantity;
    return;
  }
  cartQuantityElement.textContent = cart.totalQuantity();
}


// loadProducts(renderProductsHTML);
await loadProductsFetch();
renderProductsHTML();
addSearchEventListeners();
// loadProductsFetch().then(() => {
//   renderProductsHTML();
// });


function addSearchEventListeners() {
  const searchBtn = document.querySelector('.search-button');
  const inputElement = document.querySelector('.search-bar');
  searchBtn.addEventListener('click', () => {
    search();
  });
  inputElement.addEventListener('keydown', event => {
    if (event.key == 'Enter') search();
  });
}
function search() {
  const inputElement = document.querySelector('.search-bar');
  const input = inputElement.value;
  // console.log(products);
  // products.forEach(p => console.log(p));
  const searchedProducts = products.filter(product => lowerCase(product.name).includes(lowerCase(input)) || product.keywords.filter(key => lowerCase(key).includes(lowerCase(input))).length > 0);
  renderProductsHTML(searchedProducts);
}

function lowerCase(string) {
  return string.toLowerCase();
}