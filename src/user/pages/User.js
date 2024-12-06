import "./User.css"
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import UserItem from "../../user/components/UserItem.js";
import Places from "../../places/pages/Places"
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { AuthContext } from "../../shared/context/context.js";

const User = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    const [activeTab, setActiveTab] = useState('Places');
    const userId = useParams().userId;
    const auth = useContext(AuthContext);

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

    const tabLinkHandler = async (e, tabName) => {
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
                    className={activeTab === 'Places' ? 'profile-tab-active' : ''}
                    onClick={e => tabLinkHandler(e, 'Places')}
                >
                    Places
                </a>
                {userId === auth.userId && <a
                    href="/#"
                    className={activeTab === 'Likes' ? 'profile-tab-active' : ''}
                    onClick={e => tabLinkHandler(e, 'Likes')}
                >
                    Likes
                </a>}
            </div>
            <div className="profile-tab-content">
                {activeTab === 'Places' && (    
                    <>
                        <Places userId={userId}/>  
                    </>
                )}
                {activeTab === 'Likes' && (
                    <>
                        <Places userId={userId} likes/>  
                    </>
                )}
            </div>
        </div>
       
    )
}
export default User;