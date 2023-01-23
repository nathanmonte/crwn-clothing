
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(false));
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