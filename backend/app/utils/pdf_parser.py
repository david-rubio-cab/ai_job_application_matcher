import pdfplumber
from pathlib import Path

def extract_info_from_pdf(pdf_path):
    text = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)
                
    # Join the extracted text from all pages into a single string
    return "\n".join(text)