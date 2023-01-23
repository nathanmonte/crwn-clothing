import { useDispatch, useSelector } from "react-redux";
import { decreaseItemQuantityInCart, increaseItemQuantityInCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CheckoutItemContainer, ImageContainer, Image, CheckoutItemDetail, Quantity, Arrow, Value, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const { imageUrl, name, quantity, price } = cartItem;

    const decreaseItemQuantity = () => dispatch(decreaseItemQuantityInCart(cartItems, cartItem));
    const increaseItemQuantity = () => dispatch(increaseItemQuantityInCart(cartItems, cartItem));
    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));

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
