
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import Sticky from 'react-sticky-el'
import BoonelistApi from '../../api/api'
import UserContext from '../../auth/UserContext';
import { useAlert } from 'react-alert'
import NewCommentForm from '../comment/NewCommentForm';
import CommentCardList from '../comment/CommentCardList';
import LoadingSpinner from '../../common/LoadingSpinner'
import './SalesDetail.css'

/** Sale Detail page
 * 
 * Renders information about a sale
 * 
 * Routed at /sale/:id
 * 
 * Routes -> SaleDetail
 * 
 * TODO: Add comment and like feature
 */

function SalesDetail() {
    const { id } = useParams();
    const currentUser = useContext(UserContext);
    const route = 'sales'
    const [sale, setSale] = useState()
    const history = useHistory();
    const alert = useAlert();
    


    useEffect(function getSaleById() {

        async function getSale(){
            setSale(await BoonelistApi.getSale(id))
        }
        getSale();
    }, [id]);

    async function getSale(id){
        let sale = await BoonelistApi.getSale(id)
        setSale(sale)
    }

    function handleDate(date){
        const dateFormat = new Date(date).toLocaleDateString('en-us',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
        return dateFormat;
    }

    async function handleRemove() {
        try {
            await BoonelistApi.remove(id, route)
            alert.show('Post removed')
            history.push(`/${route}`)
        } catch(err){
            return (err)
        }
        
    }


    if(!sale) return <LoadingSpinner />

    function regularDisplay() {
        return (
            <div className="SalesDetail">
                <div>
                    <h1>{sale.itemName}</h1>
                    <h3>${sale.price}</h3>
                    <p>{sale.itemInfo}</p>
                    <p>Posted by: {sale.postedBy}</p>
                    <p>Posted on: {handleDate(sale.createdAt)}</p>
                    {/* <img src={sale.pictures}></img> */}
                </div>
                <button className="btn back-btn btn-primary"><Link to="/sales" className="sales-link" style={{textDecoration: 'none'}}>Back to All Sales</Link></button>
                <hr />
                <div className="comments">

                    <div className="comment-form">
                    <h3 id="comment-header">Comments</h3>
                    <br />
                    <Sticky >
                        <NewCommentForm  
                                        username={currentUser.username}
                                        subjectId={id}
                                        route={route}
                                        getSale={getSale}
                        />
                    </Sticky>
                </div>
                    <CommentCardList comments={sale.comments}
                                    route={route}
                                    
                    />
                </div>
            </div>
        )
    }

    function postOwnerDisplay() {
        return (
            <div className="SalesDetail">
                <div>
                    <h1>{sale.itemName}</h1>
                    <h3>${sale.price}</h3>
                    <p>{sale.itemInfo}</p>
                    <p>Posted by: {sale.postedBy}</p>
                    <p>Posted on: {handleDate(sale.createdAt)}</p>
                    <button 
                        className="btn btn-danger btn-sm mb-2 remove-btn"
                        onClick={handleRemove}
                        >Remove Post</button>
                    {/* <img src={sale.pictures}></img> */}
                </div>
                <button className="btn back-btn btn-primary"><Link to="/sales" className="sales-link" style={{textDecoration: 'none'}}>Back to All Sales</Link></button>
                <hr />
                <div className="comments">

                    <div className="comment-form">
                    <h3 id="comment-header">Comments</h3>
                    <br />
                    <Sticky >
                        <NewCommentForm  
                                        username={currentUser.username}
                                        subjectId={id}
                                        route={route}
                                        getSale={getSale}
                        />
                    </Sticky>
                </div>
                    <CommentCardList comments={sale.comments}
                                    route={route}
                                    getSale={getSale}
                    />
                </div>
            </div>
        )
    }

    return (
        <div>
            {currentUser.currentUser.username === sale.postedBy ? postOwnerDisplay() : regularDisplay()}
        </div>
    )

}

export default SalesDetail;