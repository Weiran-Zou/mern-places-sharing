import React, {useState, useContext} from "react";
import "./PlaceItem.css"
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/MyMap";
import { AuthContext } from "../../shared/context/context";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import UserItem from "../../user/components/UserItem.js";
import LikeButton from "../../shared/components/UIElements/LikeButton";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IconContext } from "react-icons";
import { FaLocationDot } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdatePlaceModal from "./UpdatePlaceModal.js";
import { Link } from "react-router-dom";

const PlaceItem = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [moreActionsIsOpen, setMoreActionsIsOpen] = useState(false);
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();

    const likeToggle = async () => {
        
        if (!auth.isLoggedIn) {
            navigate('/auth')
        }
        setIsLiked(pre => !pre);
        if (!isLiked) {
            
            setLikeCount(likeCount + 1);
        } else {
            setLikeCount(likeCount - 1);
        }
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}/like`,
                'PATCH', 
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            if (props.likedPlaceByCurrentUser) {
                props.onDelete(props.id);
            }
           
        } catch(err) {
            // undo like actions
            setIsLiked(isLiked);
            setLikeCount(likeCount);
        }  
    }

    const moreActionsToggle = () => {
        console.log(auth.userId + " " + props.creator.id )

        setMoreActionsIsOpen(pre => !pre);
    }

    const openMap = () => {
        setShowMap(true);
    }

    const closeMap = () => {
        setShowMap(false);
    }
    const openEdit = () => {
        setShowEdit(true);
    }
    const closeEdit = () => {
        setShowEdit(false);
    }

    const showDeleteHandler = () => {
        setShowConfirmModal(true);
    }  

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }  

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`, 
                'DELETE', 
                null,
                {Authorization: 'Bearer ' + auth.token}
            );
            props.onDelete(props.id);
        } catch(err) {

        }
    } 

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Modal 
                show={showMap} 
                onCancel={closeMap} 
                header={props.address} 
                contentClass="place-item__modal-content" 
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMap}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal  
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                }
            >
                <p>Do you want to proceed and deleted this place?</p>
            </Modal>
            <UpdatePlaceModal 
                show={showEdit} 
                onCancel={closeEdit} 
                id={props.id}
                title={props.title}
                description={props.description}
                imageUrl={props.imageUrl}
                address={props.address}
                onUpdate={props.onUpdate}
            ></UpdatePlaceModal>
            <Card className="place-item">
                <div className="place-item__image">
                        <img src={props.imageUrl} alt={props.alt} />
                </div>
                <div className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className="place-item__header">
                        <h2>{props.title}</h2>
                        <div className="place-item__header-actions">
                            <UserItem id={props.creator.id || props.creator._id} imageUrl={props.creator.image} name={props.creator.name} />
                            {auth.userId === (props.creator.id || props.creator._id) && <IoMdMore size="2rem" onClick={moreActionsToggle}/>}
                            { moreActionsIsOpen && <div className="more-actions-list">
                                <a onClick={openEdit}><FaEdit size="1rem"/><span>EDIT</span></a>
                                <a onClick={showDeleteHandler}><MdDelete size="1rem"/><span>DELETE</span></a>
                            </div>}
                        </div>
                        
                    </div>
                    <IconContext.Provider
                            value={{ color: `var(--secondary)`, size: '2rem' }}
                        >
                        <div className="place-item__info-loc">
                            <FaLocationDot />
                            <span> {props.address} </span>
                        </div>
                    </IconContext.Provider>
                   
                    <div className="place-item__info">
                        
                        {props.details ?
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            :
                            <>
                                <p className="place-item__info-compact">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<Link to={`/places/${props.id || props._id}`}>view more</Link></p>
                                <span className="place-item__info-viewMore"><Link to={`/places/${props.id || props._id}`}>view more</Link></span>
                            </>
                        }
                        {/* <p>{props.description}</p> */}
                        
                    </div>
                    <div className="place-item__actions">
                                
                        <LikeButton isLiked={isLiked} likeCount={likeCount} onClick={likeToggle}/>
                        <Button inverse onClick={openMap}>VIEW ON MAP</Button>
                       
                    </div>
                </div>

            </Card>
        </>
    )
}

export default PlaceItem;