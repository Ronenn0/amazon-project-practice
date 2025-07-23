export class Cart {
    cartItems;

    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addToCart(index, quantity) {
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
                quantity,
                shippingHandlingCost: 0
            });
        }
        saveCart();
        // cart[index] = (cart[index] || 0) + quantity;
        console.log(cart);
        showAddedToCartMessage(index);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    showAddedToCartMessage(index) {
        const message = document.querySelectorAll('.added-to-cart')[index];
        message.classList.add('visible');;

        //fix added text being played with.
        clearTimeout(message.dataset.timeoutId);
        message.dataset.timeoutId = setTimeout(() => {
            message.classList.remove('visible');
            message.dataset.willBeHidden = 'false';
        }, 2000);
    }

    totalQuantity() {
        let counter = 0;
        cart.forEach(product => counter += product.quantity);
        return counter;
    }
}
