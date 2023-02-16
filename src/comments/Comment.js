import '../index.css';

const Comment = ({ comment, replies, currentUserId, deletecomment }) =>{
    const fiveMin = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMin;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();

return <div className="comment">
    <div className="comment-image-container">
        <img src= 'user-icon.png' alt="user" /> 
    </div>
    <div className="comment-right-part">
        <div className="comment-content">
            <div className="comment-author">{comment.username}</div>
            <div>{comment.createdAt}</div>            
        </div>
        <div className="comment-text">{comment.body}</div>
        <div className="comment-actions">
            {canReply && <div className="comment-action">Reply</div>}
            {canEdit && <div className="comment-action">Edit</div>}
            {canDelete && <div className="comment-action" onClick={() => deletecomment(comment.id)}>Delete</div>}
        </div>
          {replies.length > 0 && <div className="replies">
                {replies.map((reply) => (<Comment comment={reply} key={reply.id} replies={[]} currentUserId={currentUserId} />))}
            </div>}
    </div>
</div>
}

export default Comment;