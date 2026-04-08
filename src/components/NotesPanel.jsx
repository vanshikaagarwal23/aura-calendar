import { useState, useEffect } from "react";
import { MONTHS } from "../utils/dateUtils";

function formatDateLabel(rangeStart, rangeEnd, currentMonth, currentYear) {
  if (!rangeStart) return `Notes for ${MONTHS[currentMonth]} ${currentYear}`;
  if (!rangeEnd) {
    return `Note for ${MONTHS[rangeStart.month]} ${rangeStart.day}, ${rangeStart.year}`;
  }
  const s = rangeStart;
  const e = rangeEnd;
  if (s.month === e.month && s.year === e.year) {
    return `${MONTHS[s.month]} ${s.day}–${e.day}, ${s.year}`;
  }
  return `${MONTHS[s.month]} ${s.day} – ${MONTHS[e.month]} ${e.day}, ${e.year}`;
}

export default function NotesPanel({
  noteKey, rangeStart, rangeEnd, currentMonth, currentYear,
  notes, onNoteChange, onClearSelection
}) {
  const [text, setText] = useState(notes[noteKey] || "");
  const [saved, setSaved] = useState(false);

  // Sync text when key changes (navigating months or changing selection)
  useEffect(() => {
    setText(notes[noteKey] || "");
    setSaved(false);
  }, [noteKey]);

  const handleChange = (e) => {
    setText(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    onNoteChange(noteKey, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    setText("");
    onNoteChange(noteKey, "");
  };

  // Collect all saved notes for this month
  const monthNotes = Object.entries(notes).filter(([k, v]) =>
    v && v.trim() && (k.startsWith(`month-${currentYear}-${currentMonth}`) ||
      k.includes(`-${currentMonth}-`))
  );

  const label = formatDateLabel(rangeStart, rangeEnd, currentMonth, currentYear);
  const isMonthNote = !rangeStart;

  return (
    <aside className="notes-panel">
      <div className="notes-header">
        <div className="notes-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        <div>
          <h3 className="notes-title">Notes</h3>
          <p className="notes-sublabel">{label}</p>
        </div>
      </div>

      <textarea
        className="notes-textarea"
        value={text}
        onChange={handleChange}
        placeholder={
          isMonthNote
            ? `Write your notes for ${MONTHS[currentMonth]}…`
            : `Jot down notes for this date range…`
        }
        rows={8}
      />

      <div className="notes-actions">
        <button className="btn-save" onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save Note"}
        </button>
        {text && (
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        )}
        {rangeStart && (
          <button className="btn-clear" onClick={onClearSelection}>← Month</button>
        )}
      </div>

      {/* Saved notes summary */}
      {monthNotes.length > 0 && (
        <div className="notes-summary">
          <h4 className="summary-title">Saved this month</h4>
          <ul className="summary-list">
            {monthNotes.slice(0, 5).map(([k, v]) => (
              <li key={k} className="summary-item">
                <span className="summary-key">{k.startsWith("month-") ? "Month note" : k.split("_")[0].split("-").slice(1).join("/")}</span>
                <span className="summary-preview">{v.slice(0, 60)}{v.length > 60 ? "…" : ""}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="notes-tip">
        <span>💡</span>
        <span>Select a date or range, then write your note above.</span>
      </div>
    </aside>
  );
}
