import json
import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .retriever import retrieve_documents
from .generator import generate_answer
import logging
import time

logger = logging.getLogger(__name__)

start_time = time.perf_counter()



@csrf_exempt  # For local API testing only; secure before deployment.
@require_POST
def ask_fitness(request):
    # 1. Parse the JSON request
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"error": "Invalid JSON request body."},
            status=400,
        )

    # 2. Validate the question
    question = data.get("question")

    if not isinstance(question, str) or not question.strip():
        return JsonResponse(
            {"error": "A non-empty question is required."},
            status=400,
        )

    question = question.strip()

    try:
        # 3. Retrieve relevant chunks from Qdrant 
        #for the given question first it creates embeddings by using the same embeddings model used for knowledge
        #then a similarily search is performed with the knowledge embeddings
        
        results = retrieve_documents(question, limit=5)
        

        retrieved_chunks = [
            result for result in results
            if result.payload and result.payload.get("text")
        ]

        if not retrieved_chunks:
            return JsonResponse({
                "question": question,
                "answer": (
                    "I couldn't find relevant information "
                    "in the fitness documents."
                ),
                "sources": [],
            })

        # 4. Prepare context for Gemini
        context = "\n\n".join(
            result.payload["text"]
            for result in retrieved_chunks
        )

        # 5. Generate the answer
        step_start = time.perf_counter()
        answer = generate_answer(question, context)    
        # Your existing LLM answer-generation code
        print("LLM generation took %.2f seconds",
            time.perf_counter() - step_start)

        # 6. Include source information in the response
        sources = [
            {
                "source": result.payload.get("source"),
                "chunk_id": result.payload.get("chunk_id"),
                "score": float(result.score),
            }
            for result in retrieved_chunks
        ]

        print("Total processing took %.2f seconds",
        time.perf_counter() - start_time)

        
        return JsonResponse({
            "question": question,
            "answer": answer,
            "sources": sources,
        })

    except Exception as exc:
        logger.exception("Failed to process fitness question : %s" , exc)

        return JsonResponse(
            {"error": 'Unable to generate an answer. Please try again later.'},
            status=502,
        )