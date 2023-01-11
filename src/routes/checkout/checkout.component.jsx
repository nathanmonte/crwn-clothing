import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
    const { cartItems, totalPrice } = useContext(CartContext);
    return <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem} />))
        }
        {
            cartItems.length === 0 ? (<div className="no-items-container">
                <p>You have no items in your cart.</p>
                <p><em>Want to add some?</em></p>
                <Link to="/shop">
                    <Button type="button">Go to shop</Button>
                </Link>
            </div>) : (<div className="total">
                Total price: £{totalPrice}
            </div>)
        }

    </div>
}

export default Checkout;