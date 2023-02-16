import { useState } from "react";
import '../index.css';

const CommentForm = ({ handleSubmit, submitLable }) =>{
    const [text, setText] = useState("");
    const isTextAreaDisabled = text.length === 0;
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(text)
        setText("")
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea className="commnet-form-textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button className="comment-form-button" disabled={isTextAreaDisabled}>{submitLable}</button>
        </form>
    )
}

export default CommentForm;