import React, {useContext} from "react"
import { useParams } from "react-router-dom";
import BoonelistApi from "../../api/api";
import UserContext from "../../auth/UserContext";
import './CommentCard.css'

function CommentCard({ commentId, route, commentText, postedBy, createdAt, getSale, getService }){
    const currentUser = useContext(UserContext).currentUser
    const {id} = useParams()

    async function handleRemoveComment(){
        try{
            await BoonelistApi.removeComment(route, id, commentId)
            if(route === 'services'){
                getService(id)
            } else {
                getSale(id)
            }
        } catch(err){
            return (err)
        }
    }

    function commentNotOwnedDisplay() {
        return (
            <div className="CommentCard">
                <div id="comment-border">
                    <div className="card-body">
                        <h4><b>{postedBy}</b></h4>
                        <h6>{createdAt}</h6>
                        <p>{commentText}</p>
                    </div>
                </div>
            </div>
        )
    }

    function commentOwnedDisplay() {
        return (
            <div className="CommentCard">
                <div id="comment-border">
                    <div className="card-body">
                        <h4><b>{postedBy}</b></h4>
                        <h6>{createdAt}</h6>
                        <p>{commentText}</p>
                        <button className="btn btn-danger btn-sm remove-comment-btn"
                                onClick={handleRemoveComment}
                        >Remove</button>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div>
            {currentUser.username === postedBy ? commentOwnedDisplay() : commentNotOwnedDisplay()}
        </div>
    )

}

export default CommentCard;