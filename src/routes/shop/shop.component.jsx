import { Route, Routes } from "react-router-dom";
import { CategoriesProvider } from "../../context/categories.context";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {

    return (<CategoriesProvider>
        <Routes>
            <Route index element={<CategoriesPreview></CategoriesPreview>} />
            <Route path=":category" element={<Category />} />
        </Routes>
    </CategoriesProvider>)
}

export default Shop;