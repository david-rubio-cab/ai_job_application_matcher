import re
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

# This helps to prepare the text for NLP tasks by removing common
# words in English that may not carry significant meaning
stop_words = set(stopwords.words('english'))

def clean_text(text):
    # Convert text to lowercase
    text = text.lower()
    
    # Remove punctuation and special characters
    text = re.sub(r"[^a-zA-Z\s]", " ", text)

    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text)
    
    # Remove stop words
    words = [w for w in text.split() if w not in stop_words]

    # Join the cleaned words back into a single string
    cleaned_text = " ".join(words)
    
    return cleaned_text
