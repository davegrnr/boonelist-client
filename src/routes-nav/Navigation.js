import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navigation.css'
import UserContext from '../auth/UserContext'
import logo from './boonelist.png'


/** Navigation bar for the site. Displayed on every page
 * 
 * If the user is loggged in, it links to the main components of the site.
 * 
 * When not logged in, shows links to login and signup forms
 * 
 * Rendered by App
 */

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext)

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/sales">
                For Sale
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/services">
                Services
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile">
                Profile
                </NavLink>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                Log out {currentUser.first_name || currentUser.username}
                </Link>
            </li>
            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">
                Login
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">
                Sign Up
                </NavLink>
            </li>
            </ul>
        );
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand ml-4" to="/">
                <img src={logo} alt="Logo" width="240px" height="100px"></img>
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Navigation;