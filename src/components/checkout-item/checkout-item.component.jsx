import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { CheckoutItemContainer, ImageContainer, Image, CheckoutItemDetail, Quantity, Arrow, Value, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const { removeItemFromCart, increaseItemQuantityInCart, decreaseItemQuantityInCart } = useContext(CartContext);

    const decreaseItemQuantity = () => decreaseItemQuantityInCart(cartItem);
    const increaseItemQuantity = () => increaseItemQuantityInCart(cartItem);
    const removeItem = () => removeItemFromCart(cartItem);

    return <CheckoutItemContainer>
        <ImageContainer>
            <Image src={imageUrl} alt={name} />
        </ImageContainer>
        <CheckoutItemDetail>{name}</CheckoutItemDetail>
        <Quantity>
            <Arrow onClick={decreaseItemQuantity}>
                &#10094;
            </Arrow>
            <Value>{quantity}</Value>
            <Arrow onClick={increaseItemQuantity}>
                &#10095;
            </Arrow>
        </Quantity>
        <CheckoutItemDetail>{price}</CheckoutItemDetail>
        <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
}

export default CheckoutItem;
