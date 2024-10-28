import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css"
import { AuthContext } from "../../context/context";
import Button from "../FormElements/Button";
import Avatar from "../UIElements/Avatar"

const NavLinks = () => {
    const auth = useContext(AuthContext);
    console.log(auth)
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">HOME</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
                </li>
            )}
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
            {auth.isLoggedIn && (
                
                    <li className="user-item__image--default">
                        <Avatar imageUrl={auth.userImage} alt="..." />  
                    </li>
                
                
            )}
             {auth.isLoggedIn && (
                <li>
                    <Button onClick={auth.logout}>LOGOUT</Button>
                </li>
            )}
        </ul>
    )
}

export default NavLinks;