import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from "./../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
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
                    <Link className="nav-link" to="/sign-in">
                        <p>SIGN-IN</p>
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;