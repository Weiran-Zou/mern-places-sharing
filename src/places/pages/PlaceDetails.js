import React, {useState, useEffect, useContext} from "react";
import PlaceItem from "../components/PlaceItem"
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useParams } from 'react-router-dom';
import Card from "../../shared/components/UIElements/Card";

import "./PlaceDetails.css"
const PlaceDetails = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const placeUpdateHandler = (updatedPid,updatedPlace) => {
        const newPlace = {
            ...loadedPlace,
            ...updatedPlace
        }
        setLoadedPlace(newPlace)
    }

    useEffect(() => {

        const fetchPlace = async () => {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
            setLoadedPlace(responseData.place) 
            

        }
        fetchPlace();
    },[sendRequest, placeId])
    return (
        <div className="place-details-wrapper">
           <ErrorModal error={error} onClear={clearError} />
           {isLoading && <LoadingSpinner asOverlay/>}
           {!isLoading && loadedPlace && <PlaceItem 
                id={loadedPlace.id} 
                imageUrl={loadedPlace.image} 
                title={loadedPlace.title} 
                description={loadedPlace.description} 
                address={loadedPlace.address}
                creator={loadedPlace.creator}
                coordinates={loadedPlace.location}
                onUpdate={placeUpdateHandler}
            />}
        
        </div>
    )
}

export default PlaceDetails;