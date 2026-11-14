"use client";
import { useRef, useState } from "react";
import type { FormEvent } from "react";

import {ChatComposer , WelcomeScreen  , MessageList , starterQuestions} from "../lib"
import { Sidebar , Topbar } from '../lib/components'
import { useFitnessApi } from "../lib/hooks";
import type { Message } from "../lib/types";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { retrieveAnswer, isLoading, error, setError } = useFitnessApi();

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submittedQuestion = question.trim();

    if (!submittedQuestion || isLoading) return;

    setQuestion("");
    setError("");

    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-user`,
        role: "user",
        content: submittedQuestion,
      },
    ]);

   try {
  const data = await retrieveAnswer(submittedQuestion);

  const answer =
  typeof data.answer === "string"
    ? data.answer
    : data.answer?.[0]?.text;

  setMessages((previous) => [
    ...previous,
    {
      id: `${Date.now()}-assistant`,
      role: "assistant",
      content:
        typeof answer === "string" && answer.trim()
          ? answer
          : "I couldn't generate an answer for that question.",
      sources: Array.isArray(data.sources) ? data.sources : [],
    },
  ]);
} catch(error) {

  console.log("Error retrieving answer:", error);
  
}
  }

  return (
    <main className="app-shell">
      <Sidebar />

      <section className="main-area">
        <Topbar />

        <div className="content-area">
          <div className="conversation">
            {messages.length === 0 ? (
              <WelcomeScreen
                starterQuestions={starterQuestions}
                onSelectQuestion={setQuestion}
                inputRef={inputRef}
              />
            ) : (
              <MessageList
                messages={messages}
                isLoading={isLoading}
                bottomRef={bottomRef}
              />
            )}
          </div>
        </div>

        <ChatComposer
          question={question}
          setQuestion={setQuestion}
          error={error}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
        />
      </section>
    </main>
  );
}
