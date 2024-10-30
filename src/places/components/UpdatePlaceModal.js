import React, {useContext} from "react";
import Input from "../../shared/components/FormElements/Input.js";
import Button from "../../shared/components/FormElements/Button.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators.js";
import "../pages/PlaceForm.css"
import {useForm} from "../../shared/hooks/form-hook.js"
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import {AuthContext} from '../../shared/context/context.js';
import Modal from "../../shared/components/UIElements/Modal.js";

const UpdatePlaceModal = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const placeId = props.id;
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm(
        {
           title: {
                value: "",
                isValid: false
           },
           description: {
                value: "",
                isValid: false
           }
            
        }, false)

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 
                'PATCH', 
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
                
            );
        } catch(err) {

        }
        props.onUpdate(props.id, {title: formState.inputs.title.value,
            description: formState.inputs.description.value});
        props.onCancel();
        
    }

    return (
        <Modal 
            show={props.show}
            onCancel={props.onCancel}
            header="Edit Place"
            footerClass="place-item__modal-actions"
        >
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay/>}
            {!isLoading && <div className="place-form" >
                <Input 
                    id="title"
                    element="input" 
                    label="title" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    initialValue={props.title}
                    initialIsValid={true}
                />
                <Input 
                    id="description"
                    element="textarea" 
                    label="Description" 
                    validators={[VALIDATOR_MINLENGTH(5)]} 
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                    initialValue={props.description}
                    initialIsValid={true}
                />
               <Button disabled={!formState.isValid} onClick={placeSubmitHandler}> UPDATE PLACE </Button>
               <Button inverse onClick={props.onCancel}>CANCEL</Button>
              
            </div>}
        </Modal>
       
    )
}

export default UpdatePlaceModal;