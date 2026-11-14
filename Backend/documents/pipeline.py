import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from .constants import PDF_FILES
from .pdf_reader import extract_text_from_pdf
from .chunker import create_chunks
from .embeddings import create_embeddings
from .vector_store import (
    get_qdrant_client,
    create_collection,
    store_embeddings,
)

# this script processes a list of PDF files, extracts text, creates chunks, generates embeddings, and stores them in a Qdrant vector store.

# For FitMind we have already stored the embeddings in qdrant vector store.
client = get_qdrant_client()

for file_path in PDF_FILES:
    print(f"\nProcessing: {file_path}")

    text = extract_text_from_pdf(file_path)
    chunks = create_chunks(text)

    if not chunks:
        print(f"No text extracted from {file_path}. Skipping.")
        continue

    embeddings = create_embeddings(chunks)

    create_collection(
        client,
        vector_size=len(embeddings[0]),
    )

    store_embeddings(
        client,
        chunks,
        embeddings,
        source=os.path.basename(file_path),
    )

    print("Number of chunks:", len(chunks))
    print("Number of embeddings:", len(embeddings))
    print(f"Successfully stored: {file_path}")

print("\nAll PDFs processed successfully!")