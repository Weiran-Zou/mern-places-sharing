import "./User.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import UserItem from "../../user/components/UserItem.js";
import UserPlaces from "../../places/pages/UserPlaces"
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";

const User = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    const [activeTab, setActiveTab] = useState('myPlaces');
    const userId = useParams().userId;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
                setLoadedUser(userResponseData.user)
    
            } catch(err) {
    
            }
        }
        fetchUser();
    }, [sendRequest, userId])

    const tabLinkHandler = (e, tabName) => {
        e.preventDefault();
        setActiveTab(tabName);
    }

    return (
        <div className="profile">
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
          
            <div className="user-profile">
                {!isLoading && loadedUser && 
                    <UserItem 
                        id={loadedUser.id} 
                        imageUrl={loadedUser.image} 
                        name={loadedUser.name}
                        size="large"
                    />}
            </div>
            <div className="profile-tab-links">
                <a
                    href="/#"
                    className={activeTab === 'myPlaces' ? 'profile-tab-active' : ''}
                    onClick={e => tabLinkHandler(e, 'myPlaces')}
                >
                    My Places
                </a>
                <a
                    href="/#"
                    className={activeTab === 'myCollections' ? 'profile-tab-active' : ''}
                    onClick={e => tabLinkHandler(e, 'myCollections')}
                >
                    My Collections
                </a>
            </div>
            <div className="profile-tab-content">
                {activeTab === 'myPlaces' && (    
                    <>
                        <h2 className="tab-heading">My places</h2> 
                        <UserPlaces />  
                    </>
                )}
                {activeTab === 'myCollections' && (
                    <h2 className="tab-heading">My collections</h2>
                )}
            </div>
        </div>
       
    )
}
export default User;