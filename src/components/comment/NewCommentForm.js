import React, { useState, useContext } from "react"
import BoonelistApi from "../../api/api";
import UserContext from "../../auth/UserContext";
import './NewCommentForm.css'

/** New Comment Form
 * 
 * Submitting the form adds a new comment to sale or service
 * 
 * Routed as /<services_or_sales>/:id
 */

function NewCommentForm({ subjectId, route, getSale, getService }) {
    const { currentUser } = useContext(UserContext)
    const BASE_STATE = {
        commentText: "",
        subjectId: subjectId,
        postedBy: currentUser.username
    }

    const [formData, setFormData] = useState(BASE_STATE);
    const [formErrors, setFormErrors] = useState([])

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await BoonelistApi.createComment(formData, subjectId, route);
            setFormData(BASE_STATE)
            (route === 'sales' ? getSale(subjectId) : getService(subjectId))
            alert('Left comment!')
        } catch(errors) {
            setFormErrors(errors)
            return
        }

        setFormErrors([])
    }


    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({...f, [name]: value}))
    }

    return (
        <div className="NewCommentForm">
            <div className="container">
                <h4 id="comment-form-header">Leave a comment</h4>
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-body">
                            <textarea 
                                name="commentText"
                                className="form-control comment-text"
                                value={formData.commentText}
                                onChange={handleChange}    
                            />
                        </div>
                        <button 
                            className="btn comment-btn btn-primary btn-sm"
                            type="submit"
                            >Leave comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewCommentForm;