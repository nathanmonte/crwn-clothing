import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        // Cycle through array and if there is a matching item increase the quantity by one
        return cartItems.map(cartItem => {
            return (cartItem.id === productToAdd.id) ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

const increaseItemQuantity = (cartItems, cartItemToIncrease) => {
    return cartItems.map(cartItem => {
        if (cartItem.id === cartItemToIncrease.id) cartItem.quantity += 1;
        return cartItem;
    })
}

const decreaseItemQuantity = (cartItems, cartItemToDecrease) => {
    // Decrease the quantity of the item
    return cartItems.map(cartItem => {
        if (cartItem.id === cartItemToDecrease.id) cartItem.quantity -= 1;
        return cartItem;
        // If the item quantity is 0 we want to remove the item as well.
    }).filter(cartItem => cartItem.quantity > 0);
}

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const decreaseItemQuantityInCart = (cartItems, cartItemToClear) => {
    const newCartItems = decreaseItemQuantity(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const increaseItemQuantityInCart = (cartItems, productToAdd) => {
    const newCartItems = increaseItemQuantity(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}