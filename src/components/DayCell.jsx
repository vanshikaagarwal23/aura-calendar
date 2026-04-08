import { isSameDate, isInRange } from "../utils/dateUtils";

export default function DayCell({ day, month, year, today, rangeStart, rangeEnd, isWeekend, onClick }) {
  const isToday = today.day === day && today.month === month && today.year === year;
  const isStart = isSameDate(day, month, year, rangeStart);
  const isEnd = isSameDate(day, month, year, rangeEnd);
  const inRange = isInRange(day, month, year, rangeStart, rangeEnd);

  let cellClass = "day-cell";
  if (isStart) cellClass += " day-start";
  else if (isEnd) cellClass += " day-end";
  else if (inRange) cellClass += " day-in-range";
  else if (isToday) cellClass += " day-today";
  if (isWeekend && !isStart && !isEnd) cellClass += " day-weekend";

  return (
    <div className={cellClass} onClick={() => onClick(day)} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick(day)}
      aria-label={`${month + 1}/${day}/${year}`}
    >
      <span className="day-number">{day}</span>
    </div>
  );
}
