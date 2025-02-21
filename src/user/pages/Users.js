import React, {useEffect, useState} from "react"
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";

const Users = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
   
    useEffect(() => {
        console.log("hi")
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');     
                setLoadedUsers(responseData.users);  
            } catch(err) {}
            
        }
        fetchUsers();
       
    }, [sendRequest])

  
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </>
    )
    
}

export default Users;