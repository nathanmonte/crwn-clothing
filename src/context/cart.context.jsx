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

const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, cartItem) => total += cartItem.quantity * cartItem.price, 0);
}

export const CartContext = createContext({
    isCartOpen: null,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    createTotalPrice: () => { },
    setCartDisplaying: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    increaseItemQuantityInCart: () => { },
    decreaseItemQuantityInCart: () => { },

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
    const [totalPrice, setTotalPrice] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }


    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const increaseItemQuantityInCart = (productToAdd) => {
        setCartItems(increaseItemQuantity(cartItems, productToAdd));
    }

    const decreaseItemQuantityInCart = (productToAdd) => {
        setCartItems(decreaseItemQuantity(cartItems, productToAdd));
    }

    /** Effects */
    const createCartCount = () => {
        const quantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(quantity);
    }

    const createTotalPrice = () => {
        setTotalPrice(calculateTotalPrice(cartItems));
    }

    useEffect(createCartCount, [cartItems]);
    useEffect(createTotalPrice, [cartItems]);


    const value = {
        isCartOpen,
        setCartDisplaying,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        increaseItemQuantityInCart,
        decreaseItemQuantityInCart,
        totalPrice
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}