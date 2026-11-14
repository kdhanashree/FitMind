import time

from django.conf import settings
from langchain_google_genai import ChatGoogleGenerativeAI


def generate_answer(question, context):
    llm = ChatGoogleGenerativeAI(
        model=settings.GOOGLE_CHAT_MODEL,
        google_api_key=settings.GOOGLE_API_KEY,
        thinking_level="low",
        max_retries=1,
    )

    prompt = f"""You are a fitness knowledge assistant.

Answer using the provided context.
Use the following context to answer the question. 
If the answer is not in the context, say "I don't know".
Provide general educational fitness information, not a medical diagnosis.

Context:
{context}

Question:
{question}

Answer:"""

    response = llm.invoke(prompt)

    return response.content
