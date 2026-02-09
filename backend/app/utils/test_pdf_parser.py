from pathlib import Path
from pdf_parser import extract_info_from_pdf

pdf_path = Path("backend/data/raw/CV.pdf")

text = extract_info_from_pdf(pdf_path)

# Print the first 1000 characters of the extracted text
print(text[:1000])  