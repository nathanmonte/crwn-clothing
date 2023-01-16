import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoriesContext } from "../../context/categories.context";
import Products from "../products/products.component";
import "./category-preview.styles.scss"

const CategoryPreview = ({ category, categoryName }) => {

    const previewSize = 4;
    const { getCategoryDisplayName } = useContext(CategoriesContext);
    const categoryDisplayName = getCategoryDisplayName(categoryName);


    return <div className="category-preview-container">

        <h2>
            <Link to={categoryName}>
                <span className="title">
                    {categoryDisplayName}
                </span>
            </Link>
        </h2>
        {<Products products={category.filter((_, index) => index < previewSize)} />}
    </div >
}

export default CategoryPreview;