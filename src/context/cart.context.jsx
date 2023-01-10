import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: null,
    setCartDisplaying: () => null
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartDisplaying] = useState(false);
    const value = { isCartOpen, setCartDisplaying };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}