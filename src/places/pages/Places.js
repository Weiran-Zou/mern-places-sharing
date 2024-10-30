import React, {useEffect, useState} from "react"
import CreatorPlaceList from "../components/CreatorPlaceList.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";

const Users = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
   
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places');     
                setLoadedPlaces(responseData.places);  
                console.log(responseData.places)
            } catch(err) {}
            
        }
        fetchPlaces();
       
    }, [sendRequest])

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
            {!isLoading && loadedPlaces && <CreatorPlaceList items={loadedPlaces}/>}
        </>
    )
    
}

export default Users;