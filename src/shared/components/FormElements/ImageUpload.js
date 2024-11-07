import React, {useRef ,useState, useEffect} from "react"
import './ImageUpload.css'
import Button from './Button';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPrievewUrl] = useState(props.imageUrl || "");
    const [isValid, setIsValid] = useState(props.imageUrl || false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPrievewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }
    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <div className="form-control">
            <input 
                id={props.id} 
                ref={filePickerRef}
                style={{display: 'none'}} 
                type="file" 
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    { previewUrl ? <img src={previewUrl} alt="Preview"></img> : <p>Please pick an image.</p> }   
                </div>
                   
            </div>
            <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            {!isValid && <p style={{marginTop:"0.5rem"}}>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload;