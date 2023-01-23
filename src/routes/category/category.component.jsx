import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button.component";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoryMap } from "../../store/categories/category.selector";
import "./category.styles.scss";

const Category = () => {
    const { category: categoryName } = useParams();
    const categoriesMap = useSelector(selectCategoryMap);
    const navigate = useNavigate();
    const [products, setProducts] = useState(categoriesMap[categoryName])
    console.log("render/re-rendering category component")

    // Custom logic
    const categoryDisplayName = categoryName[0].toUpperCase() + categoryName.slice(1);
    const goToHome = () => {
        navigate("/home");
    }

    useEffect(() => {
        console.log("effect fired for setting products");
        setProducts(categoriesMap[categoryName]);
    }, [categoryName, categoriesMap])

    return <Fragment>
        <h2 className="category-title">{categoryDisplayName}</h2>
        <div className="category-container">
            {
                products ? products.map(product => <ProductCard key={product.id} product={product} />) :
                    <Fragment>
                        <h2>No products found. </h2>
                        <Button onClick={goToHome}>Return to home.</Button>
                    </Fragment>
            }
        </div>
    </Fragment>
}

export default Category;