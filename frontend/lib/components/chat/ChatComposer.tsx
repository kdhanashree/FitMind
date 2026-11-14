
import {
  ArrowUp,
  CircleAlert,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import type {
  FormEvent,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";

interface ChatComposerProps {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  error: string;
  isLoading: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export  function ChatComposer({
  question,
  setQuestion,
  error,
  isLoading,
  handleSubmit,
  inputRef,
}: ChatComposerProps) {
  return (
    <div className="composer-area">
      {error && (
        <div className="error-message" role="alert">
          <CircleAlert size={17} />
          <div>
            <strong>Couldn't get an answer.</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      <form className="composer" onSubmit={handleSubmit}>
        <div className="composer-sparkle">
          <Sparkles size={19} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask anything about your fitness knowledge..."
          aria-label="Your fitness question"
          autoComplete="off"
          disabled={isLoading}
        />

        <button
          type="submit"
          className="send-button"
          aria-label="Send question"
          disabled={isLoading || !question.trim()}
        >
          {isLoading ? (
            <LoaderCircle size={19} className="spin-icon" />
          ) : (
            <ArrowUp size={20} />
          )}
        </button>
      </form>

      <p className="disclaimer">
        FitMind can make mistakes. Answers are for general educational
        purposes and are not a substitute for professional advice.
      </p>
    </div>
  );
}
