import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../context/categories.context";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(categoryName => <CategoryPreview key={categoryName} categoryName={categoryName} category={categoriesMap[categoryName]} />)
            }
        </Fragment>
    )
}

export default CategoriesPreview;