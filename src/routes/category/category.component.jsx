import { useEffect } from "react";
import { Fragment, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button.component";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import "./category.styles.scss";

const Category = () => {
    const { categoriesMap, getCategoryDisplayName } = useContext(CategoriesContext);
    const { category: categoryName } = useParams();
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/home");
    }

    const categoryDisplayName = getCategoryDisplayName(categoryName);

    const [products, setProducts] = useState(categoriesMap[categoryName]);

    useEffect(() => {
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