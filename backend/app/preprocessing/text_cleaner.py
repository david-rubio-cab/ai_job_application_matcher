import re
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

# This helps to prepare the text for NLP tasks by removing common
# words in English that may not carry significant meaning
stop_words = set(stopwords.words('english'))

def clean_text(text: str) -> str:
    text = text.lower()  # Convert to lowercase
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove punctuation and special characters
    text = re.sub(r"\s+", " ", text).strip()  # Remove extra whitespace

    words = [w for w in text.split() if w not in stop_words]  # Remove stop words
    return " ".join(words)  # Join the cleaned words back into a single string