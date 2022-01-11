import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import {useAlert} from 'react-alert'
import UserContext from '../../auth/UserContext'
import BoonelistApi from '../../api/api'
import './SalesCard.css'

function SalesCard({id, name, price, info, postedBy, createdAt, handleDate, route}) {
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
        <Link to={`/sales/${id}`}
        style={{textDecoration: "none"}}>
            <div className="SalesCard card card mb-2 mt-4">
                <div className="card-body SalesCard-info">
                    
                        <h5>
                            {name}
                        </h5>
                    
                    <p>${price}</p>
                    <p>Posted: {handleDate(createdAt)}</p>

                </div>
                <button className="btn btn-danger btn-sm remove-btn"
            onClick={handleRemove}>Remove</button>
            </div>
        </Link>
    )
    }

    function regularDisplay(){
        return(
            <Link to={`/sales/${id}`}
            style={{textDecoration: "none"}}>
                <div className="SalesCard card card mb-2 mt-4">
                    <div className="card-body">
                        
                            <h5>
                                {name}
                            </h5>
                        
                        <p>${price}</p>
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

export default SalesCard;