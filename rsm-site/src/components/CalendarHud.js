import React from 'react';

const SYNODIC_DAYS = 29.530588853;
const MOON_NAMES = [
  'NEW MOON', 'WAXING CRESCENT', 'FIRST QUARTER', 'WAXING GIBBOUS',
  'FULL MOON', 'WANING GIBBOUS', 'LAST QUARTER', 'WANING CRESCENT',
];
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 0 = new moon, 0.5 = full, measured from the 2000-01-06 new moon
const moonPhase = (date) => {
  const days = (date.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
  return (((days % SYNODIC_DAYS) + SYNODIC_DAYS) % SYNODIC_DAYS) / SYNODIC_DAYS;
};

const timeOfDay = (hour) => {
  if (hour === 0) return 'DARK HOUR';
  if (hour < 5) return 'LATE NIGHT';
  if (hour < 11) return 'MORNING';
  if (hour < 15) return 'DAYTIME';
  if (hour < 18) return 'AFTERNOON';
  if (hour < 22) return 'EVENING';
  return 'LATE NIGHT';
};

function Moon({ phase }) {
  const r = 20;
  const c = 22;
  const waxing = phase < 0.5 ? phase : 1 - phase;
  const rx = Math.abs(Math.cos(2 * Math.PI * waxing)) * r;
  // outer arc down the lit side, then the terminator back up; it bulges right for a crescent, left for gibbous
  const d = `M ${c} ${c - r} A ${r} ${r} 0 0 1 ${c} ${c + r} A ${rx} ${r} 0 0 ${waxing < 0.25 ? 0 : 1} ${c} ${c - r} Z`;

  return (
    <svg viewBox="0 0 44 44" className="home-hud-moon-svg" style={phase >= 0.5 ? { transform: 'scaleX(-1)' } : undefined}>
      <circle cx={c} cy={c} r={r} className="home-hud-moon-dark" />
      <path d={d} className="home-hud-moon-lit" />
    </svg>
  );
}

function CalendarHud() {
  const now = new Date();
  const phase = moonPhase(now);

  return (
    <div className="home-hud">
      <div className="home-hud-date">
        <span>{now.getMonth() + 1}</span>
        <span className="home-hud-slash">/</span>
        <span>{now.getDate()}</span>
      </div>
      <div className="home-hud-row">
        <div className="home-hud-weekday">{WEEKDAYS[now.getDay()]}</div>
        <div className="home-hud-time">{timeOfDay(now.getHours())}</div>
      </div>
      <div className="home-hud-moon">
        <Moon phase={phase} />
        <span>{MOON_NAMES[Math.round(phase * 8) % 8]}</span>
      </div>
    </div>
  );
}

export default CalendarHud;
