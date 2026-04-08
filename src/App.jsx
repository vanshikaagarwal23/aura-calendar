import { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import HeroHeader from "./components/HeroHeader";
import NotesPanel from "./components/NotesPanel";
import "./styles/global.css";

const today = new Date();

export default function App() {
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [selectionStep, setSelectionStep] = useState(0); // 0 = none, 1 = selecting end
  const [notes, setNotes] = useState({});

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wall-calendar-notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Persist notes to localStorage
  useEffect(() => {
    localStorage.setItem("wall-calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const handleDayClick = (day) => {
    const clicked = { year: currentYear, month: currentMonth, day };
    if (selectionStep === 0 || selectionStep === 2) {
      setRangeStart(clicked);
      setRangeEnd(null);
      setSelectionStep(1);
    } else {
      const startDate = new Date(rangeStart.year, rangeStart.month, rangeStart.day);
      const clickedDate = new Date(clicked.year, clicked.month, clicked.day);
      if (clickedDate < startDate) {
        setRangeStart(clicked);
        setRangeEnd(rangeStart);
      } else if (clickedDate.getTime() === startDate.getTime()) {
        setRangeStart(null);
        setRangeEnd(null);
        setSelectionStep(0);
        return;
      } else {
        setRangeEnd(clicked);
      }
      setSelectionStep(2);
    }
  };

  const clearSelection = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelectionStep(0);
  };

  const navigateMonth = (dir) => {
    let m = currentMonth + dir;
    let y = currentYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setCurrentMonth(m);
    setCurrentYear(y);
  };

  const noteKey = rangeStart && rangeEnd
    ? `${rangeStart.year}-${rangeStart.month}-${rangeStart.day}_${rangeEnd.year}-${rangeEnd.month}-${rangeEnd.day}`
    : rangeStart
    ? `${rangeStart.year}-${rangeStart.month}-${rangeStart.day}`
    : `month-${currentYear}-${currentMonth}`;

  const handleNoteChange = (key, value) => {
    setNotes(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app-shell">
      <HeroHeader
        month={currentMonth}
        year={currentYear}
        onNavigate={navigateMonth}
      />
      <div className="calendar-layout">
        <Calendar
          year={currentYear}
          month={currentMonth}
          today={{ year: today.getFullYear(), month: today.getMonth(), day: today.getDate() }}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onDayClick={handleDayClick}
          onClearSelection={clearSelection}
        />
        <NotesPanel
          noteKey={noteKey}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          currentMonth={currentMonth}
          currentYear={currentYear}
          notes={notes}
          onNoteChange={handleNoteChange}
          onClearSelection={clearSelection}
        />
      </div>
    </div>
  );
}
