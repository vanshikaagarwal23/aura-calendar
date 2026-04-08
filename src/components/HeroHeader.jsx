import { MONTHS, SEASON_THEMES } from "../utils/dateUtils";

export default function HeroHeader({ month, year, onNavigate }) {
  const theme = SEASON_THEMES[month];

  return (
    <header className="hero-header" style={{ background: theme.gradient }}>
      {/* Decorative SVG shapes */}
      <svg className="hero-deco" viewBox="0 0 800 220" preserveAspectRatio="none">
        <ellipse cx="650" cy="40" rx="180" ry="120" fill={theme.shape1} opacity="0.25" />
        <ellipse cx="100" cy="180" rx="140" ry="90" fill={theme.shape2} opacity="0.2" />
        <circle cx="400" cy="110" r="60" fill={theme.shape1} opacity="0.1" />
        <ellipse cx="720" cy="180" rx="80" ry="50" fill={theme.shape2} opacity="0.15" />
        <circle cx="60" cy="40" r="35" fill={theme.shape2} opacity="0.18" />
        {/* Botanical / geometric accents */}
        {theme.lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={theme.shape1} strokeWidth="1.5" opacity="0.2" />
        ))}
      </svg>

      {/* Content overlay */}
      <div className="hero-content">
        <div className="hero-eyebrow">{year}</div>
        <h1 className="hero-month">{MONTHS[month]}</h1>
        <p className="hero-tagline">{theme.tagline}</p>
      </div>

      {/* Navigation arrows */}
      <button className="nav-btn nav-prev" onClick={() => onNavigate(-1)} aria-label="Previous month">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="nav-btn nav-next" onClick={() => onNavigate(1)} aria-label="Next month">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </header>
  );
}
