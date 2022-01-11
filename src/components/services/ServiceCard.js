import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import {useAlert} from 'react-alert'
import UserContext from '../../auth/UserContext'
import BoonelistApi from '../../api/api'
import './ServiceCard.css'


function ServiceCard({id, title, pay, serviceInfo, postedBy, createdAt, handleDate, route}) {
    const currentUser = useContext(UserContext).currentUser
    const history = useHistory()
    const alert = useAlert()

    async function handleRemove() {
        try {
            await BoonelistApi.remove(id, route)
            alert.show('Post removed')
            history.push(`/${route}`)
        } catch(err){
            return (err)
        }
        
    }

    function postOwnerDisplay(){
    return(
        <Link to={`/services/${id}`}
            style={{textDecoration: "none"}}>
            <div className="ServiceCard card mb-2 mt-4">

                <div className="card-body ServiceCard-info">
                    
                        <h5>
                            {title}
                        </h5>
                    
                    <p>${pay}</p>
                    <p>Posted: {handleDate(createdAt)}</p>
                </div>
                <button onClick={handleRemove}
                        className="btn btn-danger btn-sm remove-btn">Remove</button>
            </div>
        </Link>
    )
    }

    function regularDisplay(){
    return(
        <Link to={`/services/${id}`}
            style={{textDecoration: "none"}}>
            <div className="ServiceCard card mb-2 mt-4">
                <div className="card-body">
                    
                        <h5>
                            {title}
                        </h5>
                    
                    <p>${pay}</p>
                    <p>Posted: {handleDate(createdAt)}</p>
                </div>

            </div>
        </Link>
    )
    }

    return (
        <div>
            {currentUser.username === postedBy ? postOwnerDisplay() : regularDisplay()}
        </div>
    )
}

export default ServiceCard;