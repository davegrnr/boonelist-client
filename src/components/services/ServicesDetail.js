import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import Sticky from "react-sticky-el"
import UserContext from '../../auth/UserContext'
import BoonelistApi from '../../api/api'
import LoadingSpinner from '../../common/LoadingSpinner'
import NewCommentForm from '../comment/NewCommentForm';
import CommentCardList from '../comment/CommentCardList'
import './ServicesDetail.css'

/** Service Detail page
 * 
 * Renders information about a service
 * 
 * Routed at /service/:id
 * 
 * Routes -> ServiceDetail
 * 
 * TODO: Add comment and like feature
 */

function ServicesDetail() {
    const { id } = useParams()
    const {currentUser} = useContext(UserContext)
    const alert = useAlert()
    const route = 'services'
    const history = useHistory();
    const [service, setService] = useState()

    useEffect(function getServiceById() {
        async function getService(){
            setService(await BoonelistApi.getService(id))
        }

        getService();
    }, [id]);

    async function getService(id){
        let service = await BoonelistApi.getService(id)
        setService(service)
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

    if(!service) return <LoadingSpinner />
    
    function regularDisplay(){
        return (
            <div className="ServicesDetail">
                <div>
                    <h1>{service.title}</h1>
                    <h3>${service.pay}</h3>
                    <p>{service.serviceInfo}</p>
                    <p>Posted by: {service.postedBy}</p>
                    <p>Posted on: {handleDate(service.createdAt)}</p>
                </div>
                <button className="btn btn-primary"><Link to="/services" className="services-link" style={{textDecoration: 'none'}}>Back to All Services</Link></button>
                <hr />
                <div>
                <div className="comments">
                    <div className="comment-form">
                    <h3 id="comment-header">Comments</h3>
                    <br />
                    <Sticky>
                        <NewCommentForm  
                                        username={currentUser.username}
                                        subjectId={id}
                                        route={route}
                                        getService={getService}
                        />
                    </Sticky>
                </div>
                    <CommentCardList comments={service.comments}
                                    route={route}
                                    getService={getService}
                    />

                </div>
    
                </div>
                
            </div>
        )
    }

    function postOwnerDisplay(){
        return (
            <div className="ServicesDetail">
                <div>
                    <h1>{service.title}</h1>
                    <h3>${service.pay}</h3>
                    <p>{service.serviceInfo}</p>
                    <p>Posted by: {service.postedBy}</p>
                    <p>Posted on: {handleDate(service.createdAt)}</p>
                    <button 
                        className="btn btn-danger btn-sm mb-2 remove-btn"
                        onClick={handleRemove}
                        >Remove Post</button>
                </div>
                <button className="btn btn-primary"><Link to="/services" className="services-link" style={{textDecoration: 'none'}}>Back to All Services</Link></button>
                <hr />
                <div>
                <div className="comments">
                    <div className="comment-form">
                    <h3 id="comment-header">Comments</h3>
                    <br />
                    <Sticky>
                        <NewCommentForm  
                                        username={currentUser.username}
                                        subjectId={id}
                                        route={route}
                                        getService={getService}
                        />
                    </Sticky>
                </div>
                    <CommentCardList comments={service.comments}
                                    route={route}
                                    getService={getService}
                    />
                </div>
    
                </div>
                
            </div>
        )
    }

    return (
        <div>
            {currentUser.username === service.postedBy ? postOwnerDisplay() : regularDisplay()}
        </div>
    )
}



export default ServicesDetail;