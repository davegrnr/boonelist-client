import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BoonelistApi from '../../api/api'
import ServiceCard from './ServiceCard'
import LoadingSpinner from '../../common/LoadingSpinner'
import greenPlus from '../../icons/greenPlus.png'
import './ServicesList.css'

function ServicesList() {
    const [services, setServices] = useState()

    useEffect(function getAllServicesOnMount(){
        search();
    }, [])

    async function search(title){
        let services = await BoonelistApi.getServices(title)
        setServices(services);
    }

    function handleDate(date){
        const dateFormat = new Date(date).toLocaleDateString('en-us',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        return dateFormat;
    }


    if(!services) return <LoadingSpinner />

    return (
        <div className="ServicesList">
            <h1>Services</h1>
            <div className="NewServiceForm-link">
                <Link to="/services/new">
                    <p className="zoom-2">
                    <img src={greenPlus} 
                    alt="greenPlus"
                    className="greenPlus popout zoom"/>
                    Post New Service
                    </p>
                </Link>
                    
            </div>
            {services.length
            ? (
                
                <div className="ServicesList-list">
                    <div className="row">
                    {services.map(s => (
                        <div className="col-lg-4">
                            <ServiceCard
                                key={s.id}
                                id={s.id}
                                title={s.title}
                                info={s.serviceInfo}
                                pay={s.pay}
                                postedBy={s.postedBy}
                                createdAt={s.createdAt}
                                route={'services'}
                                handleDate={handleDate}
                            />
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <p className="lead">Sorry, no results found!</p>
            )}
        </div>
    )
}

export default ServicesList;