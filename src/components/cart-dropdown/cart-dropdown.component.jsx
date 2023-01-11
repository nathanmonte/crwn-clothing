import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const { cartItems, setCartDisplaying } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setCartDisplaying(false);
        navigate("/checkout");
    }

    return (<div className="cart-dropdown-container">
        <div className="cart-items">
            {cartItems.map(cartItemData => (<CartItem key={cartItemData.id} {...cartItemData} />))}
        </div>
        <Button type="button" onClick={goToCheckoutHandler}>Checkout</Button>
    </div>)
}

export default CartDropdown;