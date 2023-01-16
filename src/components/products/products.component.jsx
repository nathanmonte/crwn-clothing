import { Fragment } from "react";
import ProductCard from "../product-card/product-card.component";
import "./products.styles.scss";

const Products = ({ products }) => {
    return <Fragment >
        <div className="products-container" >
            {
                products.map(product => <ProductCard key={product.id} product={product} />)
            }
        </div>
    </Fragment>
}

export default Products;