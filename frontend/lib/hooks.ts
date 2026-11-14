
import { useState } from "react";
import { FitnessApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useFitnessApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function retrieveAnswer(
    question: string
  ): Promise<FitnessApiResponse> {
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not defined");
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/ask/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data: FitnessApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    retrieveAnswer,
    isLoading,
    error,
    setError,
  };
}
