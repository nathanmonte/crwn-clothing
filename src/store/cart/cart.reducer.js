import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

/**
 * It's important that reducers don't have complex logic and are passed the new state for the mutation which is used to construct the new total state. 
 */
 export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_TOTAL:
            return {
                ...state,
                totalPrice: payload
            }
        case CART_ACTION_TYPES.SET_CART_COUNT:
            return {
                ...state,
                cartCount: payload
            }
        default:
            return state;
    }
}