import React from "react";
import "./Avatar.css"

const Avatar = (props) => {
    console.log(props.imageUrl)
    return (
        <div className= {`avatar ${props.className}`} style={props.style}>
            <img
                src={props.imageUrl}
                alt={props.alt}
                style={{width:props.width, height:props.height}}
            />
        </div>
    )
}

export default Avatar;