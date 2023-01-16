import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
    const { isCartOpen, setCartDisplaying, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setCartDisplaying(!isCartOpen);

    return <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className="shopping-icon" />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>;
}

export default CartIcon;