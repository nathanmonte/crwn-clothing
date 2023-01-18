import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoryMap } from "../../store/categories/category.selector";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoryMap);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(categoryName => <CategoryPreview key={categoryName} categoryName={categoryName} category={categoriesMap[categoryName]} />)
            }
        </Fragment>
    )
}

export default CategoriesPreview;