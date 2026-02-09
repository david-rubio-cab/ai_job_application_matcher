import re
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

# This helps to prepare the text for NLP tasks by removing common
# words in English that may not carry significant meaning
stop_words = set(stopwords.words('english'))

