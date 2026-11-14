from .embeddings import create_query_embedding
from .vector_store import get_qdrant_client, search_similar


def retrieve_documents(query, limit=5):
    query_embedding = create_query_embedding(query)

    client = get_qdrant_client()

    results = search_similar(
        client,
        query_embedding,
        limit,
    )

    return results