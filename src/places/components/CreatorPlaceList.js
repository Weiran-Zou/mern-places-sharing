import React from "react";
import "./CreatorPlaceList.css"
import Card from "../../shared/components/UIElements/Card"
import CreatorPlaceItem from "./CreatorPlaceItem";

const CreatorPlaceList = (props) => {
    return (
        <>
            {props.items.length === 0
            ? <Card><div>No places</div></Card>
            : (
                <div className="creator-place-list">
                    {props.items.map(place => (
                        <CreatorPlaceItem 
                            key={place.id} 
                            id={place.id} 
                            imageUrl={place.image} 
                            title={place.title} 
                            address={place.address}
                            location={place.location}
                            description={place.description} 
                            creator={place.creator}
                            
                        />
                    ))}
                </div>
            )
            }
        </>
    )
}

export default CreatorPlaceList;