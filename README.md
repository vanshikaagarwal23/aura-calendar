# 📅 Wall Calendar — React App

A premium, interactive wall calendar built with React + Vite.

## Features
- ✅ Monthly wall calendar with correct day alignment
- ✅ Seasonal hero header (unique gradient per month)
- ✅ Date range selection (start → end with range highlight)
- ✅ Weekend highlighting
- ✅ Today indicator
- ✅ Notes panel with localStorage persistence
- ✅ Notes per date, range, or month
- ✅ Fully responsive (mobile/desktop)
- ✅ Smooth hover/selection animations

## Getting Started

```bash
cd wall-calendar
npm install
npm run dev
```

Then open http://localhost:5173

## Project Structure

```
wall-calendar/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← Entry point
    ├── App.jsx               ← Root component + state
    ├── styles/
    │   └── global.css        ← All styles (CSS variables + classes)
    ├── components/
    │   ├── HeroHeader.jsx    ← Animated hero with month/nav
    │   ├── Calendar.jsx      ← Calendar grid container
    │   ├── DayCell.jsx       ← Individual day cell
    │   └── NotesPanel.jsx    ← Notes with localStorage
    └── utils/
        └── dateUtils.js      ← Date helpers + season themes
```

## How Date Range Works
1. Click a date → sets **Start**
2. Click another date → sets **End** (auto-corrects if before start)
3. Click same date twice → clears selection
4. Click "← Month" in notes panel → goes back to month note

## Notes Storage
Notes are keyed by:
- `month-YYYY-M` — general month note
- `YYYY-M-D` — single date note
- `YYYY-M-D_YYYY-M-D` — date range note

All saved to `localStorage` and restored on refresh.
