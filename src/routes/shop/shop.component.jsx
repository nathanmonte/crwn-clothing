import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { ShopContext, ShopProvider } from "../../context/shop.context";
import "./shop.styles.scss";

const Shop = () => {
    const { shopData: products } = useContext(ShopContext);
    return (

        <div className="products-container">
            {
                products.map((product) => <ProductCard key={product.id} product={product}></ProductCard>)
            }
        </div>
    )
}

const ShopWithContext = () => {
    return <ShopProvider><Shop></Shop></ShopProvider>
}

export default ShopWithContext;