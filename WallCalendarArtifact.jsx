import { useState, useEffect } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const SEASON_THEMES = [
  { gradient:"linear-gradient(135deg,#1a3a5c,#2d6a9f,#4a9fd4)", s1:"#a8d8f0",s2:"#fff", tag:"A fresh start on a crisp winter's day." },
  { gradient:"linear-gradient(135deg,#6b2d5e,#c4567a,#f2a7b8)", s1:"#ffd6e0",s2:"#fff", tag:"Love is in the air, and so is possibility." },
  { gradient:"linear-gradient(135deg,#2d6a4f,#52b788,#b7e4c7)", s1:"#d8f3dc",s2:"#fff", tag:"New growth reaches for the warming sun." },
  { gradient:"linear-gradient(135deg,#4a7c59,#95c17e,#e8f5d6)", s1:"#c7f0a4",s2:"#fff", tag:"April showers bring a world reborn." },
  { gradient:"linear-gradient(135deg,#7b5e7b,#c9a0dc,#f5e6ff)", s1:"#e8c8f5",s2:"#fff", tag:"Bloom where you are planted." },
  { gradient:"linear-gradient(135deg,#c4782a,#e8a24a,#ffd280)", s1:"#ffe5a0",s2:"#fff", tag:"The longest days carry the warmest light." },
  { gradient:"linear-gradient(135deg,#c4391a,#e86830,#ffaa80)", s1:"#ffd0b0",s2:"#fff", tag:"Sun-soaked days, alive with energy." },
  { gradient:"linear-gradient(135deg,#5e4a1e,#b08030,#e8c870)", s1:"#f5e0a0",s2:"#fff", tag:"Golden hours before the autumn turns." },
  { gradient:"linear-gradient(135deg,#7a3d1a,#c47840,#e8b080)", s1:"#f5d0a0",s2:"#fff", tag:"Amber leaves drift through crisp air." },
  { gradient:"linear-gradient(135deg,#4a1a0a,#8b3a1a,#c47050)", s1:"#f5b090",s2:"#fff", tag:"Harvest moon, ancient fire, deep mystery." },
  { gradient:"linear-gradient(135deg,#2a2a3a,#5a5a7a,#9090b0)", s1:"#c0c0d8",s2:"#fff", tag:"Stillness settles before winter arrives." },
  { gradient:"linear-gradient(135deg,#1a2a4a,#2d4a7a,#6080b0)", s1:"#a0c0e8",s2:"#fff", tag:"Light glows warmest in the deepest dark." }
];

function getDaysInMonth(y, m) { return new Date(y, m+1, 0).getDate(); }
function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }
function isSame(d, mo, y, date) { return date && date.day===d && date.month===mo && date.year===y; }
function inRange(d, mo, y, s, e) {
  if(!s||!e) return false;
  const t = new Date(y,mo,d).getTime();
  return t > new Date(s.year,s.month,s.day).getTime() && t < new Date(e.year,e.month,e.day).getTime();
}

function formatLabel(rs, re, mo, y) {
  if(!rs) return `Notes for ${MONTHS[mo]} ${y}`;
  if(!re) return `Note — ${MONTHS[rs.month]} ${rs.day}`;
  if(rs.month===re.month) return `${MONTHS[rs.month]} ${rs.day}–${re.day}, ${rs.year}`;
  return `${MONTHS[rs.month]} ${rs.day} – ${MONTHS[re.month]} ${re.day}`;
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --cream:#FFFAF5; --paper:#FFFDF8; --border:#EAE0D5;
    --txt:#1C1612; --muted:#8A7968;
    --acc:#C4785A; --acc-lt:#EDD8CE; --acc-dk:#9A5840;
    --range:#F5E6DF;
    --r:14px; --r-sm:8px;
    --sh:0 4px 24px rgba(60,40,20,.09);
    --sh-sm:0 2px 8px rgba(60,40,20,.07);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',system-ui,sans-serif;background:var(--cream);color:var(--txt);-webkit-font-smoothing:antialiased}
  .shell{max-width:1060px;margin:0 auto;padding:20px 18px 56px}
  
  /* HERO */
  .hero{position:relative;border-radius:var(--r);overflow:hidden;height:210px;margin-bottom:24px;box-shadow:var(--sh)}
  .hero-svg{position:absolute;inset:0;width:100%;height:100%}
  .hero-body{position:relative;z-index:2;padding:28px 52px;height:100%;display:flex;flex-direction:column;justify-content:center}
  .hero-year{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:6px}
  .hero-month{font-family:'Playfair Display',serif;font-size:clamp(38px,5.5vw,68px);font-weight:900;color:#fff;line-height:1;letter-spacing:-.02em;text-shadow:0 2px 14px rgba(0,0,0,.18)}
  .hero-tag{font-family:'Playfair Display',serif;font-style:italic;font-size:13px;color:rgba(255,255,255,.72);margin-top:9px}
  .nav-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:3;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;transition:background .18s,transform .18s;backdrop-filter:blur(4px)}
  .nav-btn:hover{background:rgba(255,255,255,.32);transform:translateY(-50%) scale(1.08)}
  .nav-prev{left:14px}.nav-next{right:14px}
  
  /* LAYOUT */
  .layout{display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start}
  
  /* CALENDAR */
  .cal{background:var(--paper);border-radius:var(--r);padding:24px;box-shadow:var(--sh);border:1px solid var(--border)}
  .cal-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;min-height:26px}
  .cal-label{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .clear-btn{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--acc);background:var(--acc-lt);border:none;border-radius:20px;padding:4px 13px;cursor:pointer;transition:background .15s,color .15s}
  .clear-btn:hover{background:var(--acc);color:#fff}
  .wd-row{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:6px}
  .wd{text-align:center;font-size:10.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);padding:7px 0}
  .wd.we{color:var(--acc)}
  .day-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
  .blank{height:42px}
  .day{height:42px;display:flex;align-items:center;justify-content:center;border-radius:50%;cursor:pointer;transition:background .13s,color .13s,transform .1s;user-select:none;position:relative}
  .day:hover:not(.ds):not(.de):not(.dt){background:var(--range);color:var(--acc)}
  .day:active{transform:scale(.91)}
  .dn{font-size:13px;font-weight:400;line-height:1;pointer-events:none}
  .dt{border:2px solid var(--acc);color:var(--acc);border-radius:50%}.dt .dn{font-weight:600}
  .ds{background:var(--acc);color:#fff;border-radius:50%;box-shadow:0 3px 10px rgba(196,120,90,.38)}.ds .dn{font-weight:700}
  .de{background:var(--acc-dk);color:#fff;border-radius:50%;box-shadow:0 3px 10px rgba(154,88,64,.36)}.de .dn{font-weight:700}
  .dir{background:var(--range);color:var(--acc);border-radius:4px}.dir .dn{font-weight:500}
  .dwe:not(.ds):not(.de):not(.dir) .dn{color:var(--acc);opacity:.72}
  .legend{display:flex;gap:14px;margin-top:18px;padding-top:15px;border-top:1px solid var(--border);flex-wrap:wrap}
  .li{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
  .ld{width:12px;height:12px;border-radius:50%;display:inline-block;flex-shrink:0}
  .ld-s{background:var(--acc)}.ld-e{background:var(--acc-dk)}
  .ld-r{background:var(--range);border:1px solid var(--acc);border-radius:3px}
  .ld-t{background:transparent;border:2px solid var(--acc)}
  
  /* NOTES */
  .notes{background:var(--paper);border-radius:var(--r);padding:22px;box-shadow:var(--sh);border:1px solid var(--border);display:flex;flex-direction:column;gap:14px;position:sticky;top:20px}
  .nh{display:flex;align-items:flex-start;gap:11px}
  .ni{width:34px;height:34px;background:var(--acc-lt);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;color:var(--acc);flex-shrink:0;margin-top:2px}
  .ntitle{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--txt);line-height:1.2}
  .nsub{font-size:11px;color:var(--acc);font-weight:500;margin-top:3px;letter-spacing:.02em}
  .ntxt{font-family:'DM Sans',sans-serif;font-size:13px;line-height:1.65;color:var(--txt);background:#fff;border:1.5px solid var(--border);border-radius:var(--r-sm);padding:12px 14px;resize:vertical;min-height:150px;transition:border-color .15s,box-shadow .15s;width:100%}
  .ntxt::placeholder{color:var(--muted)}
  .ntxt:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 3px rgba(196,120,90,.11)}
  .nactions{display:flex;gap:7px;flex-wrap:wrap}
  .btn-s{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;background:var(--acc);color:#fff;border:none;border-radius:var(--r-sm);padding:9px 18px;cursor:pointer;transition:background .15s,transform .1s;flex:1}
  .btn-s:hover{background:var(--acc-dk)}.btn-s:active{transform:scale(.97)}
  .btn-d{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;background:transparent;color:var(--muted);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:9px 14px;cursor:pointer;transition:all .15s}
  .btn-d:hover{border-color:#e57373;color:#e57373}
  .btn-c{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;background:var(--acc-lt);color:var(--acc);border:none;border-radius:var(--r-sm);padding:9px 12px;cursor:pointer;transition:background .15s}
  .btn-c:hover{background:var(--range)}
  .ns-wrap{background:#fff;border-radius:var(--r-sm);border:1px solid var(--border);padding:13px}
  .ns-ttl{font-size:10.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:9px}
  .ns-list{list-style:none;display:flex;flex-direction:column;gap:7px}
  .ns-item{display:flex;flex-direction:column;gap:2px;padding-bottom:8px;border-bottom:1px solid var(--border)}
  .ns-item:last-child{border-bottom:none;padding-bottom:0}
  .ns-key{font-size:11px;font-weight:600;color:var(--acc)}
  .ns-prev{font-size:12px;color:var(--muted);line-height:1.4}
  .ntip{display:flex;align-items:flex-start;gap:8px;font-size:11px;color:var(--muted);line-height:1.5;padding:9px 11px;background:var(--acc-lt);border-radius:var(--r-sm)}
  .ntip-icon{font-size:14px;flex-shrink:0}
  
  @media(max-width:720px){
    .layout{grid-template-columns:1fr}
    .notes{position:static}
    .hero{height:175px}.hero-body{padding:22px 52px}
    .hero-month{font-size:36px}
  }
  @media(max-width:400px){
    .hero{height:155px}.hero-month{font-size:30px}
    .day{height:36px}.blank{height:36px}.dn{font-size:12px}
  }
`;

function HeroHeader({ month, year, onNav }) {
  const t = SEASON_THEMES[month];
  return (
    <header className="hero" style={{ background: t.gradient }}>
      <svg className="hero-svg" viewBox="0 0 800 210" preserveAspectRatio="none">
        <ellipse cx="660" cy="35" rx="190" ry="110" fill={t.s1} opacity=".22"/>
        <ellipse cx="90" cy="175" rx="145" ry="85" fill={t.s2} opacity=".16"/>
        <circle cx="390" cy="105" r="65" fill={t.s1} opacity=".1"/>
        <ellipse cx="720" cy="180" rx="85" ry="50" fill={t.s2} opacity=".13"/>
        <circle cx="55" cy="38" r="32" fill={t.s2} opacity=".17"/>
        <line x1="120" y1="0" x2="220" y2="210" stroke={t.s1} strokeWidth="1.5" opacity=".18"/>
        <line x1="340" y1="0" x2="540" y2="210" stroke={t.s1} strokeWidth="1.5" opacity=".14"/>
        <line x1="620" y1="0" x2="720" y2="210" stroke={t.s1} strokeWidth="1.5" opacity=".14"/>
        <line x1="0" y1="80" x2="800" y2="130" stroke={t.s2} strokeWidth="1" opacity=".12"/>
      </svg>
      <div className="hero-body">
        <div className="hero-year">{year}</div>
        <h1 className="hero-month">{MONTHS[month]}</h1>
        <p className="hero-tag">{t.tag}</p>
      </div>
      <button className="nav-btn nav-prev" onClick={() => onNav(-1)} aria-label="Previous month">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className="nav-btn nav-next" onClick={() => onNav(1)} aria-label="Next month">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </header>
  );
}

function DayCell({ day, month, year, today, rs, re, isWe, onClick }) {
  const isToday = today.day===day && today.month===month && today.year===year;
  const isS = isSame(day,month,year,rs);
  const isE = isSame(day,month,year,re);
  const isR = inRange(day,month,year,rs,re);
  let cls = "day";
  if(isS) cls+=" ds";
  else if(isE) cls+=" de";
  else if(isR) cls+=" dir";
  else if(isToday) cls+=" dt";
  if(isWe && !isS && !isE) cls+=" dwe";
  return (
    <div className={cls} onClick={()=>onClick(day)} role="button" tabIndex={0}
      onKeyDown={e=>e.key==="Enter"&&onClick(day)}>
      <span className="dn">{day}</span>
    </div>
  );
}

function Calendar({ year, month, today, rs, re, onDayClick, onClear }) {
  const total = getDaysInMonth(year, month);
  const first = getFirstDay(year, month);
  const cells = [];
  for(let i=0;i<first;i++) cells.push(null);
  for(let d=1;d<=total;d++) cells.push(d);
  const hasSel = rs||re;
  return (
    <section className="cal">
      <div className="cal-toolbar">
        <span className="cal-label">
          {hasSel ? (re ? "Range selected":"Select end date") : "Tap a date to start"}
        </span>
        {hasSel && <button className="clear-btn" onClick={onClear}>✕ Clear</button>}
      </div>
      <div className="wd-row">
        {WEEKDAYS.map((d,i)=>(
          <div key={d} className={`wd${i===0||i===6?" we":""}`}>{d}</div>
        ))}
      </div>
      <div className="day-grid">
        {cells.map((day,idx)=>
          day===null
            ? <div key={`b${idx}`} className="blank"/>
            : <DayCell key={day} day={day} month={month} year={year}
                today={today} rs={rs} re={re}
                isWe={idx%7===0||idx%7===6}
                onClick={onDayClick}/>
        )}
      </div>
      <div className="legend">
        <span className="li"><span className="ld ld-s"/>Start</span>
        <span className="li"><span className="ld ld-e"/>End</span>
        <span className="li"><span className="ld ld-r" style={{borderRadius:"3px"}}/>In range</span>
        <span className="li"><span className="ld ld-t"/>Today</span>
      </div>
    </section>
  );
}

function NotesPanel({ noteKey, rs, re, mo, yr, notes, onSave, onClear }) {
  const [text, setText] = useState(notes[noteKey]||"");
  const [saved, setSaved] = useState(false);
  useEffect(()=>{ setText(notes[noteKey]||""); setSaved(false); }, [noteKey]);
  const label = formatLabel(rs, re, mo, yr);
  const monthNotes = Object.entries(notes).filter(([,v])=>v&&v.trim());

  const save = () => {
    onSave(noteKey, text);
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  return (
    <aside className="notes">
      <div className="nh">
        <div className="ni">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <div>
          <h3 className="ntitle">Notes</h3>
          <p className="nsub">{label}</p>
        </div>
      </div>
      <textarea className="ntxt" value={text} onChange={e=>{setText(e.target.value);setSaved(false)}}
        placeholder={rs ? "Notes for this date range…" : `Notes for ${MONTHS[mo]}…`} rows={7}/>
      <div className="nactions">
        <button className="btn-s" onClick={save}>{saved?"✓ Saved!":"Save Note"}</button>
        {text && <button className="btn-d" onClick={()=>{setText("");onSave(noteKey,"");}}>Delete</button>}
        {rs && <button className="btn-c" onClick={onClear}>← Month</button>}
      </div>
      {monthNotes.length>0 && (
        <div className="ns-wrap">
          <div className="ns-ttl">Saved notes</div>
          <ul className="ns-list">
            {monthNotes.slice(0,4).map(([k,v])=>(
              <li key={k} className="ns-item">
                <span className="ns-key">{k.startsWith("month-")?"Month note":k.replace(/_/," → ")}</span>
                <span className="ns-prev">{v.slice(0,55)}{v.length>55?"…":""}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="ntip">
        <span className="ntip-icon">💡</span>
        <span>Select a date or range on the calendar, then write your note above and save.</span>
      </div>
    </aside>
  );
}

export default function WallCalendar() {
  const today = new Date();
  const [yr, setYr] = useState(today.getFullYear());
  const [mo, setMo] = useState(today.getMonth());
  const [rs, setRs] = useState(null);
  const [re, setRe] = useState(null);
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState({});

  useEffect(()=>{
    try { const s=localStorage.getItem("wcal-notes"); if(s) setNotes(JSON.parse(s)); } catch{}
  }, []);
  useEffect(()=>{ localStorage.setItem("wcal-notes", JSON.stringify(notes)); }, [notes]);

  const navMonth = (dir) => {
    let m=mo+dir, y=yr;
    if(m<0){m=11;y--;} if(m>11){m=0;y++;}
    setMo(m); setYr(y);
  };

  const handleDay = (day) => {
    const clicked = {year:yr, month:mo, day};
    if(step===0||step===2) {
      setRs(clicked); setRe(null); setStep(1);
    } else {
      const sd=new Date(rs.year,rs.month,rs.day).getTime();
      const cd=new Date(yr,mo,day).getTime();
      if(cd<sd) { setRs(clicked); setRe(rs); }
      else if(cd===sd) { setRs(null);setRe(null);setStep(0);return; }
      else setRe(clicked);
      setStep(2);
    }
  };

  const clear = () => { setRs(null); setRe(null); setStep(0); };

  const noteKey = rs&&re
    ? `${rs.year}-${rs.month}-${rs.day}_${re.year}-${re.month}-${re.day}`
    : rs ? `${rs.year}-${rs.month}-${rs.day}`
    : `month-${yr}-${mo}`;

  const saveNote = (k, v) => setNotes(p=>({...p,[k]:v}));

  return (
    <>
      <style>{css}</style>
      <div className="shell">
        <HeroHeader month={mo} year={yr} onNav={navMonth}/>
        <div className="layout">
          <Calendar year={yr} month={mo}
            today={{year:today.getFullYear(),month:today.getMonth(),day:today.getDate()}}
            rs={rs} re={re} onDayClick={handleDay} onClear={clear}/>
          <NotesPanel noteKey={noteKey} rs={rs} re={re} mo={mo} yr={yr}
            notes={notes} onSave={saveNote} onClear={clear}/>
        </div>
      </div>
    </>
  );
}
