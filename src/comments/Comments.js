import { useState, useEffect } from "react";
import { getComments as getCommentsApi, createComment as createCommentApi, deleteComment as deleteCommentApi } from '../API';
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import '../index.css';


const Comments = ({ currentUserId }) =>{
    const [backendcomments, setBackendComments] = useState([]);
    console.log('backend', backendcomments);
    const rootComments = backendcomments.filter((backendcomment) => backendcomment.parentId === null);
    const getReplies = (commentId) => {
        return backendcomments.filter((backendcomment) => backendcomment.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } 
    const addComment = (text, parentId) => {
        createCommentApi(text, parentId).then(comment => setBackendComments([comment, ...backendcomments]));
    }
    const deletecomment = (commentId) => {
        if(window.confirm('Are you sure want to remove the comment?'))
        deleteCommentApi(commentId).then(() =>{
            const updatedBackendComments = backendcomments.filter((backendcomment) => backendcomment.id !== commentId);
            setBackendComments(updatedBackendComments);
        })
    }
    
    useEffect(()=>{
        getCommentsApi().then((data)=> {
            setBackendComments(data);
        })
    }, []);

    return<div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className="comment-form-title">Write Comments</div>
        <CommentForm submitLable="write" handleSubmit={addComment} />
        <div className="comments-container">
             {rootComments.map((rootComment) => (
                 
                    <Comment key={rootComment.id} comment={rootComment} replies = {getReplies(rootComment.id)} currentUserId={currentUserId} deletecomment={deletecomment}/>
                
             ))}
        </div>
        
    </div>
}

export default Comments;