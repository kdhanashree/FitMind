
import { Activity, BookOpen, Sparkles } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Activity size={23} />
        </div>
        <div>
          <div className="brand-name">fitmind</div>
          <div className="brand-caption">KNOWLEDGE ASSISTANT</div>
        </div>
      </div>

      <div className="side-section-title">WORKSPACE</div>

      <div className="side-item active">
        <Sparkles size={18} />
        <span>Ask FitMind</span>
      </div>

      <div className="side-item">
        <BookOpen size={18} />
        <span>Knowledge library</span>
        <span className="side-count">PDFs</span>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-card-icon">
          <BookOpen size={19} />
        </div>
        <h3>Grounded in knowledge</h3>
        <p>
          Answers are generated using relevant chunks from your fitness
          documents.
        </p>
        <div className="sidebar-note">
          <span className="status-dot" />
          RAG assistant
        </div>
      </div>
    </aside>
  );
}
