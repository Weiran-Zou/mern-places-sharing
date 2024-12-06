import React, {useEffect, useState, useContext} from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import PlaceList from "../components/PlaceList.js";
import { AuthContext } from "../../shared/context/context.js";

const Users = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const auth = useContext(AuthContext);
    let url;
    if (props.userId && props.likes) {
        url = `${process.env.REACT_APP_BACKEND_URL}/places/user/${props.userId}/likes`
    } else if (props.userId) {
        url = `${process.env.REACT_APP_BACKEND_URL}/places/user/${props.userId}`
    } else {
        url = `${process.env.REACT_APP_BACKEND_URL}/places`
    }
    console.log(url)
    
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = auth.isLoggedIn ? 
                    await sendRequest(
                        url, 
                        'GET',
                        null,
                        {
                            Authorization: 'Bearer ' + auth.token
                        }
                    ) : await sendRequest(url);     
                setLoadedPlaces(responseData.places);  
                console.log(responseData.places)
            } catch(err) {}
            
        }
        fetchPlaces();
       
    }, [sendRequest])
    const placeDeleteHandler = (deletedPid) => {
        setLoadedPlaces(prePlaces => prePlaces.filter(place => place.id !== deletedPid))
    }

    const placeUpdateHandler = (updatedPid,updatedPlace) => {
        const newPlaces = loadedPlaces.map(p => {
            if (p.id === updatedPid) {
                return {
                    ...p,
                    ...updatedPlace
                }
            }
            return p;
        })
        setLoadedPlaces(newPlaces)
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
            {!isLoading && loadedPlaces &&  <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} onUpdatePlace={placeUpdateHandler} likes={props.likes}/>}
        </>
    )
    
}

export default Users;