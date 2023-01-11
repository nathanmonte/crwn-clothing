import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);


    return (<div className="cart-dropdown-container">
        <div className="cart-items">
            {cartItems.map(cartItemData => (<CartItem key={cartItemData.id} {...cartItemData} />))}
        </div>
        <Button></Button>
    </div>)
}

export default CartDropdown;