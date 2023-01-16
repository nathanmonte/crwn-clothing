import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import Products from "../products/products.component";
import { CategoryLink } from "./category-preview.styles";

const CategoryPreview = ({ category, categoryName }) => {

    const previewSize = 4;
    const { getCategoryDisplayName } = useContext(CategoriesContext);
    const categoryDisplayName = getCategoryDisplayName(categoryName);


    return <div className="category-preview-container">

        <h2>
            <CategoryLink to={categoryName}>
                <span className="title">
                    {categoryDisplayName}
                </span>
            </CategoryLink>
        </h2>
        {<Products products={category.filter((_, index) => index < previewSize)} />}
    </div >
}

export default CategoryPreview;