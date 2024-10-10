import PlaceItem from "../components/PlaceItem"
import { useLocation } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card";
import UserItem from "../../user/components/UserItem";
import "./PlaceDetails.css"
const PlaceDetails = () => {
    const location = useLocation();
    const place = location.state;
    return (
        <div className="place-details-wrapper">
            
            <Card className="place-details">
                <UserItem id={place.creator.id} imageUrl={place.creator.image} name={place.creator.name} />
                <PlaceItem 
                    id={place.id} 
                    imageUrl={place.imageUrl} 
                    title={place.title} 
                    description={place.description} 
                    address={place.address}
                    creatorId={place.creator.id}
                    coordinates={place.location}
                    onDelete={place.onDeletePlace}
                />
            </Card>
        </div>
    )
}

export default PlaceDetails;