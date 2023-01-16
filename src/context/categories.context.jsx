import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// Value of the context
// We don't need the setter function here.
export const CategoriesContext = createContext({
    categoriesMap: {},
    getCategoryDisplayName: () => { }
});

export const CategoriesProvider = ({ children }) => {
    // Use state
    const [categoriesMap, setCategoriesMap] = useState({});

    const getCategoryDisplayName = (categoryName) => categoryName[0].toUpperCase() + categoryName.slice(1);

    // Return the provider component
    useEffect(() => {
        // Always create a new async function within useEffect.
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log("Got category map", categoryMap);
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap();

    }, []);

    const value = { categoriesMap, getCategoryDisplayName }

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}