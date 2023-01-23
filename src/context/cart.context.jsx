import { createContext, useReducer } from "react";
import { cartReducer, CART_INITIAL_STATE } from "../store/cart/cart.reducer";
import { createAction } from "../utils/reducer/reducer.utils";









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

/**
 * Product
 * {id, name, price, imageUrl}
 * Cart item
 * {id, name, price, imageUrl, quantity}
 */

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartCount, totalPrice, cartItems }, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);



    const toggleCartDisplayingReducer = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const updateCartItemsReducer = (newCartItems) => {



        // dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, totalPrice: newTotalPrice, cartCount: newCartCount }));

    }

    const value = {
        isCartOpen,
        setCartDisplaying: toggleCartDisplayingReducer,
        // addItemToCart,
        cartItems,
        cartCount,
        // removeItemFromCart,
        // increaseItemQuantityInCart,
        // decreaseItemQuantityInCart,
        totalPrice
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}