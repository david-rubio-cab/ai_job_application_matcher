from fastapi import FastAPI, UploadFile, File
from pathlib import Path

# app is my FastAPI instance, which will be used as a server
# to handle incoming requests
app = FastAPI()

# UPLOAD_DIR is the directory where uploaded CVs will be stored
UPLOAD_DIR = Path("backend/data/raw")
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
    
    return {
        "status": "success",
        "filename": file.filename
    }