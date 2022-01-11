import React, { useState, useContext } from "react";
import Alert from '../../common/Alert'
import BoonelistApi from '../../api/api'
import UserContext from '../../auth/UserContext'
import './ProfileForm.css'

function ProfileForm(){
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email,
        username: currentUser.username,
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    /**On form submit:
     * - Attempt save to backend, report errors
     * - On success:
     *      -Show save confirmed
     *      -Set current user throughout site
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await BoonelistApi.saveProfile(username, profileData)
        } catch(errors){
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({...f, password: ""}));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(updatedUser);
    }

    function handleChange(evt) {
        const { name, value } = evt.target
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([])
    }

    return (
        <div className="ProfileForm">
        <h3>Profile</h3>
        <div className="card">
            <div className="card-body">
            <form>
                <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group input-container">
                <label>First Name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group input-container">
                <label>Last Name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group input-container">
                <label>Email</label>
                <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group input-container">
                <label>Phone</label>
                <input
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group input-container">
                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                {saveConfirmed
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}

                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                Save Changes
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}
export default ProfileForm;