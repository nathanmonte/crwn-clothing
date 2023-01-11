import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const { removeItemFromCart, increaseItemQuantityInCart, decreaseItemQuantityInCart } = useContext(CartContext);

    const decreaseItemQuantity = () => decreaseItemQuantityInCart(cartItem);
    const increaseItemQuantity = () => increaseItemQuantityInCart(cartItem);
    const removeItem = () => removeItemFromCart(cartItem);

    return <div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} alt={name} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={decreaseItemQuantity}>
                &#10094;
            </div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={increaseItemQuantity}>
                &#10095;
            </div>
        </span>
        <span className="price">{price}</span>
        <span className="remove-button" onClick={removeItem}>&#10005;</span>
    </div>
}

export default CheckoutItem;
