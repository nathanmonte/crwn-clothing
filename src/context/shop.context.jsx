import { useState } from "react";
import { createContext } from "react";
import SHOP_DATA from "../shop-data.json";

// Value of the context
// We don't need the setter function here.
export const ShopContext = createContext({
    shopData: null
});

export const ShopProvider = ({ children }) => {
    // Use state
    const [shopData] = useState(SHOP_DATA);

    // Return the provider component
    const value = { shopData };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}