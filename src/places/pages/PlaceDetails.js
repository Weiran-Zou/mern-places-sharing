import PlaceItem from "../components/PlaceItem"
import { useLocation } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card";

import "./PlaceDetails.css"
const PlaceDetails = () => {
    const location = useLocation();
    const place = location.state;
    return (
        <div className="place-details-wrapper">
           
                <PlaceItem 
                    id={place.id} 
                    imageUrl={place.imageUrl} 
                    title={place.title} 
                    description={place.description} 
                    address={place.address}
                    creatorId={place.creator.id}
                    creator={place.creator}
                    coordinates={place.location}
                    onDelete={place.onDeletePlace}
                />
         
        </div>
    )
}

export default PlaceDetails;