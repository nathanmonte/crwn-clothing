import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
    const { cartItems, setCartDisplaying } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setCartDisplaying(false);
        navigate("/checkout");
    }

    return (<CartDropdownContainer >
        <CartItems>
            {cartItems.length ? cartItems.map(cartItemData => (<CartItem key={cartItemData.id} {...cartItemData} />)) : (
                <EmptyMessage>Your cart is empty.</EmptyMessage>
            )}
        </CartItems>
        <Button type="button" onClick={goToCheckoutHandler}>Checkout</Button>
    </CartDropdownContainer>)
}

export default CartDropdown;