import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems, CheckoutButton } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
    const { cartItems, setCartDisplaying } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setCartDisplaying(false);
        navigate("/checkout");
    }

    return (<CartDropdownContainer >
        <CartItems>
            {cartItems.map(cartItemData => (<CartItem key={cartItemData.id} {...cartItemData} />))}
        </CartItems>
        <CheckoutButton type="button" onClick={goToCheckoutHandler}>Checkout</CheckoutButton>
    </CartDropdownContainer>)
}

export default CartDropdown;