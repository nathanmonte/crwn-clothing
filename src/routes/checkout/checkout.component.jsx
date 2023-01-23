
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import "./checkout.styles.scss";

const Checkout = () => {
    const totalPrice = useSelector(selectCartTotal);
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate()

    const goToShop = () => {
        navigate("/shop")
    }

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
            cartItems.length === 0 ?
                (<div className="no-items-container">
                    <p>You have no items in your cart.</p>
                    <p><em>Want to add some?</em></p>
                    <Button type="button" onClick={goToShop}>Go to shop</Button>
                </div>)
                : (
                    <div className="total">
                        Total price: £{totalPrice}
                    </div>)
        }

    </div>
}

export default Checkout;