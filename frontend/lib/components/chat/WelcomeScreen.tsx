
import { BookOpen, Dumbbell, Sparkles } from "lucide-react";
import type { RefObject } from "react";

interface WelcomeScreenProps {
  starterQuestions: string[];
  onSelectQuestion: (question: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function WelcomeScreen({
  starterQuestions,
  onSelectQuestion,
  inputRef,
}: WelcomeScreenProps) {
  return (
    <section className="welcome">
      <div className="welcome-tag">
        <Sparkles size={15} />
        YOUR PERSONAL KNOWLEDGE ASSISTANT
      </div>

      <h1>
        Fitness questions,
        <br />
        <span>clearer answers.</span>
      </h1>

      <p className="welcome-description">
        Ask about exercises, training principles, or recovery.
        FitMind retrieves relevant information from your fitness
        knowledge base to help answer your question.
      </p>

      <div className="suggestions-heading">
        <span>TRY ASKING</span>
        <span className="suggestions-caption">
          Select a question to get started
        </span>
      </div>

      <div className="prompt-grid">
        {starterQuestions.map((prompt, index) => (
          <button
            type="button"
            className="prompt-card"
            key={prompt}
            onClick={() => {
              onSelectQuestion(prompt);
              inputRef.current?.focus();
            }}
          >
            <span className="prompt-icon">
              {index % 2 === 0 ? (
                <Dumbbell size={18} />
              ) : (
                <BookOpen size={18} />
              )}
            </span>

            <span>{prompt}</span>
            <span className="prompt-arrow">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}
