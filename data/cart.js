import { products } from "./products.js";

class Cart {
    cartItems;

    constructor() {
        this.cartItems = (JSON.parse(localStorage.getItem('cart'))?.cartItems) || [];
    }

    addToCart(index, quantity) {
        let alreadyExists = false;
        for (const product of this.cartItems) {
            if (product.index == index) {
                product.quantity += quantity;
                //console.log(this.cartItems);
                alreadyExists = true;
                break;
            }
        }
        if (!alreadyExists) {
            this.cartItems.push({
                index,
                quantity,
                shippingHandlingCost: 0
            });
        }
        this.saveCart();
        // cart[index] = (cart[index] || 0) + quantity;
        // console.log(this.cartItems);
        try {
            this.showAddedToCartMessage(index);
        } catch { }
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
        this.cartItems.forEach(product => counter += product.quantity);
        return counter;
    }

    getCartOrganized() {
        const new_cart = { ...cart };
        const new_cartItems = [];
        this.cartItems.forEach((item) => {
            new_cartItems.push({
                productId: products[Number(item.index)].id,
                quantity: item.quantity,
                deliveryOptionId: item.shippingHandlingCost == 0 ? '1' : item.shippingHandlingCost == 4.99 ? '2' : item.shippingHandlingCost == 7.99 ? '3' : '1'
            })
        });
        new_cart.cartItems = new_cartItems;
        return new_cart;
    }

    resetItems() {
        this.cartItems = [];
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

export let cart = new Cart();