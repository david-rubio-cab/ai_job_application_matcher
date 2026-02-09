import React , { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadCV.css";

// Define the structure of a job offer
type JobOffer = {
    jobTitle: string;
    companyName: string;
    location: string;
    jobDescription: string;
    similarity: number;
};

type BackendOffer = {
  "Job Title": string;
  "Company Name": string;
  "Location": string;
  "Job Description": string;
  similarity: number;
};

// React.FC define the component as a functional component
const UploadCV: React.FC = () => {
    const [cv, setCV] = useState<File | null >(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedCV, setUploadedCV] = useState<string | null>(null);
    const [matches, setMatches] = useState<JobOffer[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            setCV(acceptedFiles[0]);
            setUploadedCV(null); // Reset the uploaded CV state when a new file is dropped
            setMatches([]); // Reset the matches state when a new file is dropped
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // In a future I will add more formats like docx, etc.
        accept:{"application/pdf": []},
        // Only allow one file to be uploaded at a time
        multiple: false,
    });

    const handleSubmit = async () => {
        if (!cv) return;

        setUploading(true);
        
        const formData = new FormData();
        // The key "file" should match the key expected by the backend, in this case it's "file"
        formData.append("file", cv);

        try {
            // This endpoint works because of the proxy configuration in vite.config.ts
            const res = await fetch("/upload-cv", {
                method: "POST",
                // Content-Type is automatically set to multipart/form-data when using FormData
                body: formData,
            });

            // Check if the response is ok (status in the range 200-299)
            if (!res.ok) {
                throw new Error(`Error al subir el CV: ${res.statusText}`);
            }


            const data = await res.json();
            console.log("Respuesta del backend:", data);

            // Here is handled the response from the backend, 
            // In this case we just set the filename to show it in the UI, 
            // But in a future I will show the job offers that match with the CV
            setUploadedCV(data.filename);

            const topOffers: JobOffer[] = data.top_offers.map((offer: BackendOffer) => ({
                jobTitle: offer["Job Title"],
                companyName: offer["Company Name"],
                location: offer["Location"],
                jobDescription: offer["Job Description"],
                similarity: offer["similarity"],
            }));

            setMatches(topOffers.slice(0, 5));

            alert("CV subido exitosamente!");
        }catch (err) {
            console.error("Error al subir CV:", err);
            alert("Error al subir CV, revisa la consola");
        // Is always executed, even if there is an error, so I can set uploading to false
        }finally {
            setUploading(false);
        }
    };
        
    return (
        //In a future I will have a "change language" option
        <div className="upload-container">
            <h1>Una vez introduzcas tu CV se te mostraran diversas ofertas de trabajo en las que encajas</h1>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>

                {/* This allows me to make the dropzone clickable */}
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta el archivo aquí...</p>
                ) : (
                    <p>Arrastra tu CV aquí o haz click para seleccionar</p>
                )}
            </div>

            {cv && <p className="selected-file">Archivo seleccionado: {cv.name}</p>}
            
            
            {uploadedCV && (
                <p className="success-message">CV subido correctamente: {uploadedCV}</p>
            )}

            {/* This button only appears when a file is selected and it changes to show if the file is uploading */}
            <button onClick={handleSubmit} className="submit-button" disabled={!cv}>
                {uploading ? "Subiendo..." : "Upload CV"}
            </button>

            {/* Render top matching job offers */}
            {matches.length > 0 && (
                <div className="job-offers">
                <h2>Top matching job offers</h2>
                <ul>
                    {matches.map((offer, idx) => (
                    <li key={idx} className="job-offer">
                        <h3>{offer.jobTitle}</h3>
                        <p><strong>Company:</strong> {offer.companyName}</p>
                        <p><strong>Location:</strong> {offer.location}</p>
                        <p>{offer.jobDescription.slice(0, 200)}...</p>
                        <p><em>Match score: {(offer.similarity * 100).toFixed(2)}%</em></p>
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
};

export default UploadCV;