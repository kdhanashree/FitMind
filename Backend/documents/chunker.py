from langchain_text_splitters import RecursiveCharacterTextSplitter
from .pdf_reader import extract_text_from_pdf


def create_chunks(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )

    chunks = splitter.split_text(text)

    return chunks

