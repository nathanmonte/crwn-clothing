import { useContext } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrownLogo } from "./../../assets/crown.svg";
import { CartContext } from "../../context/cart.context";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";

const Navigation = () => {

    const { isCartOpen } = useContext(CartContext);

    // Use context re-renders due to any changes in the context which it has access to.
    const { currentUser } = useContext(UserContext);

    const logOut = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div>
                <NavigationContainer className="navigation">
                    <LogoContainer to="/">
                        <CrownLogo alt="logo" />
                    </LogoContainer>
                    <NavLinksContainer>
                        <NavLink to="/shop">
                            SHOP
                        </NavLink>
                        {
                            currentUser ? (
                                <NavLink as="span" onClick={logOut}>SIGN-OUT</NavLink>
                            ) : (
                                <NavLink to="/auth">
                                    SIGN-IN
                                </NavLink>
                            )
                        }
                        <CartIcon />
                    </NavLinksContainer>
                    {/* This is a conditional element. It returns the second item if the first item is true. */}
                    {isCartOpen && <CartDropdown />}
                </NavigationContainer>
            </div>
            <Outlet />
        </Fragment >
    )
}

export default Navigation;