import React, {useReducer, useEffect} from "react";
import "./Input.css"
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'FocusLost':
            return {
                ...state,
                isFocusLost: true
            }
        default:
            return state;
    }
}



const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, 
        {
            value: props.initialValue || '', 
            isValid: props.initialIsValid || false, 
            isFocusLost: false
    });
    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const changeHandler = (event) => {
        
        dispatch({type: 'CHANGE', val: event.target.value, validators:props.validators});
    }

    const blurHandler = () => {
        dispatch({
            type:"FocusLost"
        });
    };

    const element = props.element === "input" ? (
    <input 
        id={props.id} 
        placeholder={props.placeholder} 
        onChange={changeHandler} 
        onBlur={blurHandler}
        value={inputState.value}
    /> 
    ) : (
    <textarea 
        id={props.id} 
        rows={props.rows || 3}  
        onChange={changeHandler} 
        onBlur={blurHandler}
        value={inputState.value}
    />
    );

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isFocusLost && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isFocusLost && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;