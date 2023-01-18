import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CategoriesProvider } from "../../context/categories.context";
import { setCategoriesMap } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
    const dispatch = useDispatch();

    // Return the provider component
    useEffect(() => {
        // Always create a new async function within useEffect.
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoryMap));
        }

        getCategoriesMap();
    }, []);

    return (<CategoriesProvider>
        <Routes>
            <Route index element={<CategoriesPreview></CategoriesPreview>} />
            <Route path=":category" element={<Category />} />
        </Routes>
    </CategoriesProvider>)
}

export default Shop;