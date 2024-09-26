import React, {useContext} from "react"
import "./PlaceForm.css"
import Input from "../../shared/components/FormElements/Input"
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators"
import Button from "../../shared/components/FormElements/Button"
import {useForm} from "../../shared/hooks/form-hook"
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import {AuthContext} from '../../shared/context/context.js';
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useNavigate } from 'react-router-dom';
import ImageUpload from "../../shared/components/FormElements/ImageUpload.js"

const NewPlace = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
   const [formState, inputHandler] = useForm(
        {
            
            title :{
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            },
            address: {
                value: "",
                isValid: false
            },
            image: {
                value: null,
                isValid: false
            }
            
        },
        false
   )

   
    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('address', formState.inputs.address.value);
        formData.append('image', formState.inputs.image.value);
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/places','POST',  
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate('/');
          
        } catch(err) {

        }
        console.log(formState.inputs)
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <Input 
                    id="title"
                    element="input" 
                    label="title" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <ImageUpload center id="image" name="image" onInput={inputHandler} errorText="Please provide an image"/>
                <Input 
                    id="description"
                    element="textarea" 
                    label="Description" 
                    validators={[VALIDATOR_MINLENGTH(5)]} 
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input 
                    id="address"
                    element="input" 
                    label="address" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid} > ADD PLACE </Button>
            </form>
        </>
  
    )
}

export default NewPlace;