import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import UserItem from "../../user/components/UserItem.js";

const UserPlaces = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    const userId = useParams().userId;

    useEffect(() => {
       
        const fetchPlaces = async () => {
            try {
              
                const placesResponseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
          
                setLoadedPlaces(placesResponseData.places);
    
            } catch(err) {
    
            }
        }
        fetchPlaces();
    }, [sendRequest, userId])

    const placeDeleteHandler = (deletedPid) => {
        setLoadedPlaces(prePlaces => prePlaces.filter(place => place.id !== deletedPid))
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
          
           {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </>
        
    )
}

export default UserPlaces;