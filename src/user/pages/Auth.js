import React, {useState, useContext} from "react";
import "./Auth.css"
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button";
import Card from '../../shared/components/UIElements/Card.js';
import { AuthContext } from "../../shared/context/context.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import ImageUpload from "../../shared/components/FormElements/ImageUpload.js";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true)
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
            email: {
                value: "",
                isValid: ""
            },
            password: {
                value: "",
                isValid: ""
            }
        },
        false
    )
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined
                }, 
                formState.inputs.email.isValid && formState.inputs.password.isValid
            )
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
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
        }
        setIsLoginMode(preMode => !preMode);
    }

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        let responseData;
        if (isLoginMode) {
            try {
                responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/users/login','POST',  
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {'Content-Type': 'application/json'}
                );
                console.log(responseData.userImage)
                auth.login(responseData.userId, responseData.userImage, responseData.token);
                
            } catch(err) {

            }

        } else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/users/signup','POST',  
                    // JSON.stringify({
                    //     name: formState.inputs.name.value,
                    //     email: formState.inputs.email.value,
                    //     password: formState.inputs.password.value
                    // }),
                    // {'Content-Type': 'application/json'}
                    formData
                );
                auth.login(responseData.userId, responseData.token);
                console.log(responseData)
            } catch(err) {
                
            }         
        }
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            id="name"
                            element="input"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your name."
                            onInput={inputHandler}
                        />

                    )}
                    {!isLoginMode && <ImageUpload center id='image' onInput={inputHandler} errorText="Please provide an image"/>}
                    <Input
                        id="email"
                        element="input"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email."
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password, at least 6 characters."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Signup'}</Button>
                </form>
                <Button inverse onClick={switchModeHandler}> SWITCH TO {isLoginMode ? 'SIGHUP': 'LOGIN'} </Button>
            </Card>
        </>
       
    )
}

export default Auth;