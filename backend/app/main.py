from fastapi import FastAPI, UploadFile, File
from pathlib import Path

from app.utils.pdf_parser import extract_info_from_pdf

# app is my FastAPI instance, which will be used as a server
# to handle incoming requests
app = FastAPI()

# UPLOAD_DIR is the directory where uploaded CVs will be stored
UPLOAD_DIR = Path("data/raw")
# Create the upload directory if it doesn't exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Endpoint to send a POST request from the frontend to upload a CV file
@app.post("/upload-cv")
# Async function to handle the file upload, which takes a File object as 
# an obligatory parameter
async def upload_cv(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    # Open the file in write-binary mode and write the content on the specified path
    with open(file_path, "wb") as f:
        content = await file.read()  # Read the file content
        f.write(content)  # Write the content to the specified path

        # Extract text from the uploaded PDF
        pdf_text = extract_info_from_pdf(file_path)  
    
    return {
        "status": "success",
        "filename": file.filename,
        "pdf_text_preview": pdf_text[:1000]  # Only return the first 1000 characters of the PDF text
    }