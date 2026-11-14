from django.conf import settings
from langchain_google_genai import GoogleGenerativeAIEmbeddings


def get_embeddings_model():
    return GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-2-preview",
        google_api_key=settings.GOOGLE_API_KEY,
    )

def create_embeddings(chunks):

    embeddings = get_embeddings_model()

    vectors = embeddings.embed_documents(chunks)

    return vectors


def create_query_embedding(query):

    embeddings = get_embeddings_model()

    query_vector = embeddings.embed_query(query)

    return query_vector