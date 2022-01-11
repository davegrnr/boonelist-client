import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert"
import Alert from '../../common/Alert'
import BoonelistApi from '../../api/api'
import UserContext from '../../auth/UserContext'
import './NewServiceForm.css'

/** New service form
 * Submitting the form creates a new service with the provided data.
 * 
 * Confirmation is a simple <Alert>
 * 
 * Routed as /services
 */

function NewServiceForm() {
    const { currentUser } = useContext(UserContext)
    const history = useHistory();

    const [formData, setFormData] = useState({
        title: "",
        pay: "",
        serviceInfo: "",
    });
    const [formErrors, setFormErrors] = useState([]);


    const alert = useAlert()

    /** On form submit:
     *  - Attempt save to backend, report any errors
     *  -On success:
     *      -Show new service confirmation
     *      -Redirect to services list
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let username = currentUser.username
        try {
            await BoonelistApi.createService(formData, username);
            alert.show('Service created!', {type: 'success'})
        } catch(errors){
            setFormErrors(errors);
            return
        }
        
        setFormErrors([])
        history.push(`/services`)
    }

    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({...f, [name]: value}))
    }


    return (
        <div className="NewServiceForm">
        <div className="container ">
            <h2 className="mb-3">Post New Service</h2>
            <div className="card new-service-card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Pay</label>
                    <input
                        name="pay"
                        className="form-control"
                        value={formData.pay}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="serviceInfo"
                        className="form-control"
                        value={formData.serviceInfo}
                        onChange={handleChange}
                    />
                </div>

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
                <div>
                    <Link to="/services">Go Back to All Services</Link>
                </div>
            </div>
        </div>
        </div>
    );
}

export default NewServiceForm;