import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrownLogo } from "./../../assets/crown.svg";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {

    // A selector allows you to select values you care about from the entire state object passed to every component.
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);


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