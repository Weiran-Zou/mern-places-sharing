import React from "react";
import "./PlaceList.css"
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const PlaceList = (props) => {
    return (
        <div className="place-list-container">
            {props.items.length === 0
            ? (
                <div className="place-list center">
                    <Card>
                        <h2>No places found. Maybe create one?</h2>
                        <Button to="/places/new">SHARE PLACE</Button>
                    </Card>
                </div>
                
            
            ) : (
                <ul className="place-list">
                    {props.items.map(place => (
                        <PlaceItem 
                            key={place.id || place._id} 
                            id={place.id || place._id} 
                            imageUrl={place.image} 
                            title={place.title} 
                            description={place.description} 
                            address={place.address}
                            creator={place.creator}
                            coordinates={place.location}
                            onDelete={props.onDeletePlace}
                            onUpdate={props.onUpdatePlace}
                            isLiked={place.isLiked}
                            likeCount={place.likeCount}
                        />
                    ))}
                </ul>
            )
            }
        </div>
    )
}

export default PlaceList;