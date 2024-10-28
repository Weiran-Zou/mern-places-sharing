import React, {useState, useContext} from "react";
import {Link} from "react-router-dom"
import "./MainNavigation.css"
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";
import Logo from "../../../assets/images/logo-place-app.png"
import Avatar from "../UIElements/Avatar"
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/context";

const MainNavigation = (props) => {
    
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const auth = useContext(AuthContext);

    const dropDownToggle = () => {
        console.log(dropDownIsOpen)
        setDropDownIsOpen(pre => !pre);
    }
    const openDrawer = () => {
        setDrawerIsOpen(true);
        console.log(drawerIsOpen)
    }
    const closeDrawer = () => {
        setDrawerIsOpen(false);
        console.log(drawerIsOpen)
    }
    
    return (
        <>
            {drawerIsOpen && <BackDrop onClick={closeDrawer}/>}
            {drawerIsOpen 
            && (<SideDrawer>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>)}
           
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawer} >
                    <span />
                    <span />
                    <span />
                </button>
        
                <Link to="/"><div className="nav-logo"><img src={Logo} alt="logo"/></div></Link>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
                {auth.isLoggedIn && (
                    <div className="user-item__image--default">
                        <NavLink className="user-profile" onClick={dropDownToggle}>
                            <Avatar imageUrl={auth.userImage} alt="..." />
                        </NavLink>
                        {dropDownIsOpen && (
                            <ul className="profile-dropDown-list">
                                <li><NavLink to={`/${auth.userId}`} onClick={() => {setDropDownIsOpen(false)}}>MY PROFILE</NavLink></li>
                                <li ><a href="/#" onClick={() => {setDropDownIsOpen(false); auth.logout(); }}>Logout</a></li>
                            </ul>
                        )}
                        
                    </div>  
                
                )}
            </MainHeader>
        </>
    )
}

export default MainNavigation;