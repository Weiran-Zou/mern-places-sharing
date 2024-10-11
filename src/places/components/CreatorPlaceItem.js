import React from "react";
import "./CreatorPlaceItem.css"
import "./PlaceItem.css"
import Card from "../../shared/components/UIElements/Card"
import UserItem from "../../user/components/UserItem";
import { Link } from "react-router-dom";

const CreatorPlaceItem = (props) => {
   
    return (
        <Link className="creator-place-item" to={`/places/${props.id}`} state={props}>
            <Card >
                <UserItem id={props.creator.id} imageUrl={props.creator.image} name={props.creator.name} />
                <div className="place-item">
                    <div className="place-item__content">
                        <div className="place-item__image">
                            <img src={props.imageUrl} alt={props.alt} />
                        </div>
                        <div className="place-item__info">
                            <h2>{props.title}</h2>
                            <p>{props.description}</p>
                        </div>
                    </div>
                </div>
                
            </Card>
        </Link>
       
    )
}

export default CreatorPlaceItem;