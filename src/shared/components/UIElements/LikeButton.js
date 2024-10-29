import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import "./LikeButton.css"

const LikeButton = (props) => {
    return (
        <IconContext.Provider
            value={{ color: `var(--secondary)`, size: '2rem' }}
        >
            <div className="like-btn" onClick={props.onClick}>
                {props.isLiked?  <AiFillLike /> : <AiOutlineLike />}
                <span>{props.likeCount || 0}</span>
            </div>
        </IconContext.Provider>
        
    )
}

export default LikeButton;