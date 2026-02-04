import React , { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadCV.css";

const UploadCV: React.FC = () => {
    const [cv, setCV] = useState<File | null >(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            setCV(acceptedFiles[0]);
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept:{
            "application/pdf": []
        }
    });

    const handleSubmit = () => {
        if (!cv) return;
        //Send to back using fetch
        console.log("Enviando archivo:", cv.name);
    };

    return (
        //In a future I will have a "change language" option
        <div className="upload-container">
            <h1>Una vez introduzcas tu CV se te mostraran diversas ofertas de trabajo en las que encajas</h1>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>

                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta el archivo aquí...</p>
                ) : (
                    <p>Arrastra tu CV aquí o haz click para seleccionar</p>
                )}
            </div>

            {cv && <p className="selected-file">Archivo seleccionado: {cv.name}</p>}

            <button onClick={handleSubmit} className="submit-button" disabled={!cv}>Upload CV</button>
        </div>
    );
};

export default UploadCV;