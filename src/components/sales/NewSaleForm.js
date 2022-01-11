import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert"
// import ImageUploader from 'react-images-upload';
import Alert from '../../common/Alert'
import BoonelistApi from '../../api/api'
import UserContext from '../../auth/UserContext'
import './NewSaleForm.css'

/** New sale form
 * Submitting the form creates a new sale with the provided data.
 * 
 * Confirmation is a simple <Alert>
 * 
 * Routed as /sales/new
 */

function NewSaleForm() {
    const { currentUser } = useContext(UserContext)
    const history = useHistory();

    const [formData, setFormData] = useState({
        itemName: "",
        itemInfo: "",
        price: "",

    });
    const [formErrors, setFormErrors] = useState([]);


    
    const alert = useAlert()

    /** On form submit:
     *  - Attempt save to backend, report any errors
     *  -On success:
     *      -Show new sales confirmation
     *      -Redirect to sales list
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let username = currentUser.username;
        try {
            await BoonelistApi.createSale(formData, username);
            alert.show('Sale created', {type: 'success'})
        } catch(errors){
            setFormErrors(errors);
            return
        }
        
        setFormErrors([])
        history.push(`/sales`)
    }

    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({...f, [name]: value}))
    }



    return (
        <div className="NewSaleForm">
        <div className="container">
            <h2 className="mb-3">Post New Sale</h2>
            <div className="card new-sale-card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Item Name</label>
                    <input
                        name="itemName"
                        className="form-control"
                        value={formData.itemName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Item Info</label>
                    <textarea
                        name="itemInfo"
                        className="form-control"
                        value={formData.itemInfo}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label>Upload Pictures</label>
                    <ImageUploader
                        name="pictures"
                        withIcon={false}
                        buttonText='Choose images'
                        onChange={handleChange}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </div> */}

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary"
                    onSubmit={handleSubmit}
                >
                    Submit
                </button>
                </form>
            </div>
            </div>
            <div>
                    <Link to="/sales">Go Back</Link>
                </div>
        </div>
        </div>
    );
}

export default NewSaleForm;