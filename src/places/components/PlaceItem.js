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

const PlaceItem = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMap = () => {
        setShowMap(true);
    }

    const closeMap = () => {
        setShowMap(false);
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
        props.onDelete(props.id);
        
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
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className="place-item__image">
                        <img src={props.imageUrl} alt={props.alt} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3> {props.address} </h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMap}>VIEW ON MAP</Button>
                        {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {auth.userId === props.creatorId && <Button danger onClick={showDeleteHandler}>DELETE</Button>}
                    </div>
                </Card>

            </li>
        </>
    )
}

export default PlaceItem;