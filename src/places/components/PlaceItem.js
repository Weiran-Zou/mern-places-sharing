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
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdatePlaceModal from "./UpdatePlaceModal.js";

const PlaceItem = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likeCount || 0);
    const [moreActionsIsOpen, setMoreActionsIsOpen] = useState(false);
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();

    const likeToggle = async () => {
        if (!auth.token) {
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
        } catch(err) {

        }
        if (props.onDelete) {
            props.onDelete(props.id);
        } else { // delete place on details page
            navigate('/');
        }
       
        
        console.log("Deletinh")
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
                            <UserItem id={props.creator.id} imageUrl={props.creator.image} name={props.creator.name} />
                            {auth.userId === props.creator.id && <IoMdMore size="2rem" onClick={moreActionsToggle}/>}
                            { moreActionsIsOpen && <div className="more-actions-list">
                                <a onClick={openEdit}><FaEdit size="1rem"/><span>EDIT</span></a>
                                <a onClick={showDeleteHandler}><MdDelete size="1rem"/><span>DELETE</span></a>
                            </div>}
                        </div>
                        
                    </div>
                   
                   
                    <div className="place-item__info">
                        
                        <h3> {props.address} </h3>
                        <p>{props.description}</p>
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