const cart = JSON.parse(localStorage.getItem('cart')) || [];
displayCartQuantity();
function addToCart(index, quantity) {
    let alreadyExists = false;
    for (const product of cart) {
        if (product.index == index) {
            product.quantity += quantity;
            //console.log(cart);
            alreadyExists = true;
            break;
        }
    }
    if (!alreadyExists) {
        cart.push({
            index,
            quantity
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // cart[index] = (cart[index] || 0) + quantity;
    console.log(cart);
    showAddedToCartMessage(index);
    displayCartQuantity();
}

function showAddedToCartMessage(index) {
    const message = document.querySelectorAll('.added-to-cart')[index];
    message.style.opacity = 1;

    //fix added text being played with.
    if (message.dataset.willBeHidden == 'true') return;
    message.dataset.willBeHidden = 'true';
    setTimeout(() => {
        message.style.opacity = 0;
        message.dataset.willBeHidden = 'false';
    }, 2000);
}

function totalQuantity() {
    let counter = 0;
    cart.forEach(product => counter += product.quantity);
    return counter;
}

function displayCartQuantity(quantity) {
    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (quantity) {
        cartQuantityElement.textContent = Number(cartQuantityElement.textContent) + quantity;
        return;
    }
    cartQuantityElement.textContent = totalQuantity();
}