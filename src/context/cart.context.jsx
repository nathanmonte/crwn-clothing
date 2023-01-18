import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({

    createTotalPrice: () => { },
    setCartDisplaying: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    increaseItemQuantityInCart: () => { },
    decreaseItemQuantityInCart: () => { },

});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const INITIAL_STATE = {
    isCartOpen: null,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
}


/**
 * It's important that reducers don't have complex logic and are passed the new state for the mutation which is used to construct the new total state. 
 */
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type}`);
    }
}


/**
 * Product
 * {id, name, price, imageUrl}
 * Cart item
 * {id, name, price, imageUrl, quantity}
 */

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartCount, totalPrice, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const decreaseItemQuantityInCart = (cartItemToClear) => {
        const newCartItems = decreaseItemQuantity(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const increaseItemQuantityInCart = (productToAdd) => {
        const newCartItems = increaseItemQuantity(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const toggleCartDisplayingReducer = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const updateCartItemsReducer = (newCartItems) => {

        // Generate new cart count
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        // Generate new cart total
        const newTotalPrice = cartItems.reduce((total, cartItem) => total += cartItem.quantity * cartItem.price, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, totalPrice: newTotalPrice, cartCount: newCartCount }));

    }

    const value = {
        isCartOpen,
        setCartDisplaying: toggleCartDisplayingReducer,
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