
import {
  BookOpen,
  Bot,
  LoaderCircle,
  UserRound,
} from "lucide-react";
import type { RefObject } from "react";
import type { Message as ChatMessage } from "../../types";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export function MessageList({
  messages,
  isLoading,
  bottomRef,
}: MessageListProps) {
  return (
    <div className="messages-list">
      {messages.map((message) => (
        <article
          className={`message-row ${
            message.role === "user" ? "user-row" : "assistant-row"
          }`}
          key={message.id}
        >
          <div className="message-avatar">
            {message.role === "user" ? (
              <UserRound size={18} />
            ) : (
              <Bot size={19} />
            )}
          </div>

          <div className="message-body">
            <div className="message-label">
              {message.role === "user" ? "YOU" : "FITMIND"}
            </div>

            <div className="message-bubble">
              <div className="message-content">{message.content}</div>
            </div>

            {message.role === "assistant" &&
              message.sources &&
              message.sources.length > 0 && (
                <div className="sources">
                  <div className="sources-heading">
                    <BookOpen size={14} />
                    RETRIEVED SOURCES
                  </div>

                  <div className="source-list">
                    {message.sources.map((source, index) => (
                      <span
                        className="source-chip"
                        key={`${source.source}-${source.chunk_id}-${index}`}
                      >
                        {source.source || "Fitness library"}
                        {source.chunk_id != null
                          ? ` · Chunk ${source.chunk_id}`
                          : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </article>
      ))}

      {isLoading && (
        <div className="message-row assistant-row">
          <div className="message-avatar">
            <Bot size={19} />
          </div>

          <div className="message-body">
            <div className="message-label">FITMIND</div>

            <div className="message-bubble loading-bubble">
              <LoaderCircle size={17} className="spin-icon" />
              Searching your knowledge base .Generating your answer may take a little time.
      Please wait while FitMind processes your question.
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
