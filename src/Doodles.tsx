export function Sun() {
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
      <circle cx="50" cy="50" r="22" fill="#16140f" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const x1 = 50 + Math.cos(angle) * 32;
        const y1 = 50 + Math.sin(angle) * 32;
        const x2 = 50 + Math.cos(angle) * 45;
        const y2 = 50 + Math.sin(angle) * 45;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#16140f"
            strokeWidth="5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function Flower() {
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const cx = 50 + Math.cos(angle) * 20;
        const cy = 50 + Math.sin(angle) * 20;
        return <circle key={i} cx={cx} cy={cy} r="16" fill="#16140f" />;
      })}
      <circle cx="50" cy="50" r="12" fill="#faf3ea" />
    </svg>
  );
}

export function Star() {
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
      <path
        d="M50 8 L61 39 L94 39 L67 58 L78 90 L50 70 L22 90 L33 58 L6 39 L39 39 Z"
        fill="#16140f"
      />
    </svg>
  );
}

export function Brush() {
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
      <rect x="44" y="8" width="12" height="42" rx="6" fill="#16140f" />
      <path
        d="M30 50 Q50 40 70 50 L64 78 Q50 88 36 78 Z"
        fill="#16140f"
      />
      <circle cx="50" cy="86" r="8" fill="#16140f" />
    </svg>
  );
}

export function Heart() {
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
      <path
        d="M50 88 C20 66 6 46 6 28 C6 12 18 4 30 4 C40 4 47 10 50 18 C53 10 60 4 70 4 C82 4 94 12 94 28 C94 46 80 66 50 88 Z"
        fill="#16140f"
      />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M2 30 C 30 5, 55 5, 80 20 S 130 35, 150 15 S 185 5, 198 20"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
