import { useEffect } from "react";
import { createContext, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: null,
    cartItems: [],
    setCartDisplaying: () => null,
    addItemToCart: () => { },
    cartCount: 0
});

/**
 * Product
 * {id, name, price, imageUrl}
 * Cart item
 * {id, name, price, imageUrl, quantity}
 */

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartDisplaying] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addItemToCart = (productToAdd) => {
        console.log(cartItems);
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const createCartCount = () => {
        const quantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(quantity);
    }

    useEffect(createCartCount, [cartItems]);


    const value = { isCartOpen, setCartDisplaying, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}