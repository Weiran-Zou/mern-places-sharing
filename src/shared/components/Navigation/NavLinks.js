import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css"
import { AuthContext } from "../../context/context";

const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">HOME</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">ADD PLACE</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">SIGN IN</NavLink>
                </li>
            )}
            
        </ul>
    )
}

export default NavLinks;