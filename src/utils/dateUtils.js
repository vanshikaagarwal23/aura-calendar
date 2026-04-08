export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

export function isSameDate(day, month, year, date) {
  if (!date) return false;
  return date.day === day && date.month === month && date.year === year;
}

export function isInRange(day, month, year, start, end) {
  if (!start || !end) return false;
  const d = new Date(year, month, day).getTime();
  const s = new Date(start.year, start.month, start.day).getTime();
  const e = new Date(end.year, end.month, end.day).getTime();
  return d > s && d < e;
}

// Per-month seasonal themes for the hero header
export const SEASON_THEMES = [
  // Jan
  {
    gradient: "linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 50%, #4a9fd4 100%)",
    shape1: "#a8d8f0", shape2: "#ffffff",
    tagline: "A fresh start on a crisp winter's day.",
    lines: [
      {x1:100,y1:0,x2:200,y2:220},{x1:300,y1:0,x2:500,y2:220},
      {x1:600,y1:0,x2:700,y2:220},{x1:0,y1:80,x2:800,y2:120}
    ]
  },
  // Feb
  {
    gradient: "linear-gradient(135deg, #6b2d5e 0%, #c4567a 50%, #f2a7b8 100%)",
    shape1: "#ffd6e0", shape2: "#ffffff",
    tagline: "Love is in the air, and so is possibility.",
    lines: [
      {x1:200,y1:0,x2:100,y2:220},{x1:400,y1:0,x2:600,y2:220},
      {x1:700,y1:50,x2:500,y2:220},{x1:0,y1:110,x2:800,y2:110}
    ]
  },
  // Mar
  {
    gradient: "linear-gradient(135deg, #2d6a4f 0%, #52b788 50%, #b7e4c7 100%)",
    shape1: "#d8f3dc", shape2: "#ffffff",
    tagline: "New growth reaches for the warming sun.",
    lines: [
      {x1:50,y1:220,x2:200,y2:0},{x1:350,y1:220,x2:450,y2:0},
      {x1:600,y1:220,x2:750,y2:0},{x1:0,y1:140,x2:800,y2:80}
    ]
  },
  // Apr
  {
    gradient: "linear-gradient(135deg, #4a7c59 0%, #95c17e 50%, #e8f5d6 100%)",
    shape1: "#c7f0a4", shape2: "#ffffff",
    tagline: "April showers bring a world reborn.",
    lines: [
      {x1:100,y1:0,x2:300,y2:220},{x1:400,y1:0,x2:600,y2:220},
      {x1:700,y1:0,x2:800,y2:180},{x1:0,y1:60,x2:800,y2:160}
    ]
  },
  // May
  {
    gradient: "linear-gradient(135deg, #7b5e7b 0%, #c9a0dc 50%, #f5e6ff 100%)",
    shape1: "#e8c8f5", shape2: "#ffffff",
    tagline: "Bloom where you're planted.",
    lines: [
      {x1:0,y1:0,x2:150,y2:220},{x1:250,y1:0,x2:400,y2:220},
      {x1:550,y1:0,x2:650,y2:220},{x1:0,y1:100,x2:800,y2:100}
    ]
  },
  // Jun
  {
    gradient: "linear-gradient(135deg, #c4782a 0%, #e8a24a 50%, #ffd280 100%)",
    shape1: "#ffe5a0", shape2: "#ffffff",
    tagline: "The longest days carry the warmest light.",
    lines: [
      {x1:100,y1:220,x2:200,y2:0},{x1:300,y1:220,x2:500,y2:0},
      {x1:650,y1:220,x2:750,y2:0},{x1:0,y1:150,x2:800,y2:70}
    ]
  },
  // Jul
  {
    gradient: "linear-gradient(135deg, #c4391a 0%, #e86830 50%, #ffaa80 100%)",
    shape1: "#ffd0b0", shape2: "#ffffff",
    tagline: "Sun-soaked days, alive with energy.",
    lines: [
      {x1:50,y1:0,x2:100,y2:220},{x1:200,y1:0,x2:400,y2:220},
      {x1:550,y1:0,x2:700,y2:220},{x1:0,y1:90,x2:800,y2:130}
    ]
  },
  // Aug
  {
    gradient: "linear-gradient(135deg, #5e4a1e 0%, #b08030 50%, #e8c870 100%)",
    shape1: "#f5e0a0", shape2: "#ffffff",
    tagline: "Golden hours before the autumn turns.",
    lines: [
      {x1:150,y1:0,x2:250,y2:220},{x1:400,y1:0,x2:600,y2:220},
      {x1:700,y1:0,x2:800,y2:200},{x1:0,y1:80,x2:800,y2:140}
    ]
  },
  // Sep
  {
    gradient: "linear-gradient(135deg, #7a3d1a 0%, #c47840 50%, #e8b080 100%)",
    shape1: "#f5d0a0", shape2: "#ffffff",
    tagline: "Amber leaves drift through crisp air.",
    lines: [
      {x1:0,y1:220,x2:200,y2:0},{x1:300,y1:220,x2:500,y2:0},
      {x1:600,y1:220,x2:800,y2:0},{x1:0,y1:110,x2:800,y2:110}
    ]
  },
  // Oct
  {
    gradient: "linear-gradient(135deg, #4a1a0a 0%, #8b3a1a 50%, #c47050 100%)",
    shape1: "#f5b090", shape2: "#ffffff",
    tagline: "Harvest moon, ancient fire, deep mystery.",
    lines: [
      {x1:100,y1:0,x2:0,y2:220},{x1:300,y1:0,x2:200,y2:220},
      {x1:600,y1:0,x2:700,y2:220},{x1:0,y1:70,x2:800,y2:150}
    ]
  },
  // Nov
  {
    gradient: "linear-gradient(135deg, #2a2a3a 0%, #5a5a7a 50%, #9090b0 100%)",
    shape1: "#c0c0d8", shape2: "#ffffff",
    tagline: "Stillness settles before winter arrives.",
    lines: [
      {x1:200,y1:0,x2:100,y2:220},{x1:450,y1:0,x2:550,y2:220},
      {x1:700,y1:0,x2:750,y2:220},{x1:0,y1:120,x2:800,y2:100}
    ]
  },
  // Dec
  {
    gradient: "linear-gradient(135deg, #1a2a4a 0%, #2d4a7a 50%, #6080b0 100%)",
    shape1: "#a0c0e8", shape2: "#ffffff",
    tagline: "Light glows warmest in the deepest dark.",
    lines: [
      {x1:100,y1:0,x2:200,y2:220},{x1:350,y1:0,x2:500,y2:220},
      {x1:650,y1:0,x2:750,y2:220},{x1:0,y1:60,x2:800,y2:160}
    ]
  }
];
