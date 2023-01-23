import { createSelector } from "reselect";

const selectCartReducer = entireState => entireState.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

// Generate new cart count
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 0
    )
);

// Generate new cart total
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total += cartItem.quantity * cartItem.price, 0
    )
);

