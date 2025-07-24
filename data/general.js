import { products, loadProductsFetch } from "./products.js";
if (products.length == 0) {
    await loadProductsFetch();
}

export function getProductById(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) return products[i];
    }
}

export function dateToString(dateStr) {
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    return `${month} ${day}`;
}