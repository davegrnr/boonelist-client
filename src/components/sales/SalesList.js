import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BoonelistApi from '../../api/api'
import SalesCard from './SalesCard'
import LoadingSpinner from '../../common/LoadingSpinner'
import greenPlus from '../../icons/greenPlus.png'
import './SalesList.css'

function SalesList() {
    const [sales, setSales] = useState()

    useEffect(function getAllSalesOnMount(){
        search();
    }, [])

    async function search(itemName){
        let sales = await BoonelistApi.getSales(itemName)
        setSales(sales);
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

    if(!sales) return <LoadingSpinner />

    return (
        <div className="SalesList">
            <h1>Items for Sale</h1>
            <div className="NewSalesForm-link">
            <Link to="/sales/new">
                    <img src={greenPlus}
                    alt="greenPlus" 
                    className="greenPlus popout zoom"/>
                    Post New Item For Sale</Link>
            </div>
            {sales.length
            ? (
                <div className="SalesList-list">
                    <div className="row">
                    {sales.map(s => (
                        <div className="col-lg-4">
                            <SalesCard
                                key={s.id}
                                id={s.id}
                                name={s.itemName}
                                info={s.itemInfo}
                                price={s.price}
                                createdAt={s.createdAt}
                                postedBy={s.postedBy}
                                route={'sales'}
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

export default SalesList;