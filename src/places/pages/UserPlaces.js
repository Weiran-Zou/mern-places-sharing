import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";

const UserPlaces = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId = useParams().userId;
    console.log(userId);
    useEffect(() => {
       
        const fetchPlaces = async () => {
            try {
                
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
    
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