import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import UserContext from '../../auth/UserContext'
import './Homepage.css'

/** Site Homepage
 * 
 * Displays welcome message or login/register buttons
 * 
 * Routed at /
 * 
 * Routes -> Homepage
 */

function Homepage(){
    const { currentUser } = useContext(UserContext)

    console.log(currentUser)

    function loggedOutHomepage(){
        return(
            <div className="Homepage">
                <div className="container">
                    <h1 className="boonelist-heading">Welcome to Boonelist!</h1>
                    <h3>Check out local services offered and items for sale for the Boone, NC and surrounding areas in one convenient place</h3>
                    <button className="btn btn-primary btn-lg mr-3"><Link to="/login" style={{color: "#fff"}}>Login</Link></button>
                    <span> or </span>
                    <button className="btn btn-primary btn-lg ml-3"><Link to="/signup" style={{color: "#fff"}}>Signup</Link></button>
                    <h3 className="mt-2">to get started</h3>
                </div>
            </div>
        )
    }

    function loggedInHomepage(){
        return (
            <div className="Homepage">
                <div className="container">
                    <h1 className="boonelist-heading">Welcome to Boonelist, {currentUser.username}!</h1>
                    <h3>Check out local services offered and items for sale for the Boone, NC and surrounding areas in one convenient place</h3>
                    <h3>OR</h3>
                    <h3>Post your own <Link to="/services/new">service</Link> or <Link to="/sales/new">item</Link></h3>

                </div>

            </div>
        )
    }

    return (
        <div>
            { currentUser ?  loggedInHomepage() : loggedOutHomepage() }
        </div>
    )
}

export default Homepage;