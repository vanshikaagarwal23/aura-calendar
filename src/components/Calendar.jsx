import DayCell from "./DayCell";
import { WEEKDAYS, getDaysInMonth, getFirstDayOfMonth } from "../utils/dateUtils";

export default function Calendar({ year, month, today, rangeStart, rangeEnd, onDayClick, onClearSelection }) {
  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month); // 0=Sun

  // Build grid cells: leading blanks + day numbers
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const hasSelection = rangeStart || rangeEnd;

  return (
    <section className="calendar-section">
      <div className="calendar-toolbar">
        <span className="calendar-label">
          {hasSelection
            ? rangeEnd
              ? "Range selected"
              : "Select end date"
            : "Select a date to begin"}
        </span>
        {hasSelection && (
          <button className="clear-btn" onClick={onClearSelection}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* Weekday headers */}
      <div className="weekday-row">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`weekday-label ${i === 0 || i === 6 ? "weekend-label" : ""}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="day-grid">
        {cells.map((day, idx) =>
          day === null ? (
            <div key={`blank-${idx}`} className="day-blank" />
          ) : (
            <DayCell
              key={day}
              day={day}
              month={month}
              year={year}
              today={today}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              isWeekend={((idx) % 7 === 0) || ((idx) % 7 === 6)}
              onClick={onDayClick}
            />
          )
        )}
      </div>

      {/* Legend */}
      <div className="legend">
        <span className="legend-item">
          <span className="legend-dot legend-start" />
          Start
        </span>
        <span className="legend-item">
          <span className="legend-dot legend-end" />
          End
        </span>
        <span className="legend-item">
          <span className="legend-dot legend-range" />
          Range
        </span>
        <span className="legend-item">
          <span className="legend-dot legend-today" />
          Today
        </span>
      </div>
    </section>
  );
}
