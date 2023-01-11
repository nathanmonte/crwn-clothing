import { useContext } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrownLogo } from "./../../assets/crown.svg";
import "./navigation.styles.scss";
import { CartContext } from "../../context/cart.context";

const Navigation = () => {

    const { isCartOpen } = useContext(CartContext);

    // Use context re-renders due to any changes in the context which it has access to.
    const { currentUser } = useContext(UserContext);

    const logOut = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo alt="logo" />
                </Link>
                <div className="nav-links-container" >
                    <Link className="nav-link" to="/shop">
                        <p>SHOP</p>
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={logOut}>SIGN-OUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                                <p>SIGN-IN</p>
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {/* This is a conditional element. It returns the second item if the first item is true. */}
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment >
    )
}

export default Navigation;