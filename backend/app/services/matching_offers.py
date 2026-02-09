import pandas as pd
# Tf-IDF calculates the importance of words in a document relative to a collection of documents (corpus)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load job offers from a CSV file
job_offers = pd.read_csv("data/raw/job_offers.csv")

# Prepare the vectorizer and fit it on the job offers' descriptions
vectorizer = TfidfVectorizer(stop_words='english')

job_offers["full_text"] = (
    job_offers["Job Description"].fillna("") + " " +
    job_offers["Job Title"].fillna("")
)

jobs_matrix = vectorizer.fit_transform(job_offers['full_text'])

def find_matching_offers(cv_text: str, top_n: int = 3):
    cv_vector = vectorizer.transform([cv_text])
    similarities = cosine_similarity(cv_vector, jobs_matrix).flatten()

    # Get the index of the top N most similar job offers
    # argsort() returns the indices that would sort the array, 
    # [::-1] reverses the order to get the most similar first,
    # [:top_n] selects the top N indices
    top_indices = similarities.argsort()[::-1][:top_n]
    top_offers = job_offers.iloc[top_indices]

    # Add similarity scores to the top offers
    top_offers = top_offers.copy()
    top_offers['similarity'] = similarities[top_indices]

    # 'records' format returns a list of dictionaries, where each dictionary represents a row in the DataFrame
    return top_offers.to_dict(orient='records')