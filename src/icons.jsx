// Small hand-drawn SVG icons, one per stage theme. Using shapes and symbols
// (ships, crowns, flags, maps) rather than depicting real people keeps the
// art tasteful for a children's game and needs no external image files.

const wrap = (children) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">{children}</svg>
);

export function StageIcon({ id, color }) {
  switch (id) {
    case 1: // Dutch & French times — sailing ship
      return wrap(
        <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 40 L54 40 L47 52 L17 52 Z" fill={color} opacity="0.15" />
          <path d="M10 40 L54 40 L47 52 L17 52 Z" />
          <line x1="32" y1="40" x2="32" y2="10" />
          <path d="M32 12 L50 24 L32 30 Z" fill={color} opacity="0.35" />
          <path d="M32 16 L20 24 L32 28 Z" fill={color} opacity="0.2" />
        </g>
      );
    case 2: // British rule & labour — a gate / arrival depot
      return wrap(
        <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="26" width="40" height="26" fill={color} opacity="0.12" />
          <rect x="12" y="26" width="40" height="26" />
          <path d="M12 26 L32 12 L52 26" />
          <rect x="27" y="34" width="10" height="18" fill={color} opacity="0.3" />
          <line x1="18" y1="52" x2="18" y2="58" />
          <line x1="46" y1="52" x2="46" y2="58" />
        </g>
      );
    case 3: // Independence — a waving flag
      return wrap(
        <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16" y1="8" x2="16" y2="56" />
          <path d="M16 12 C 28 8, 30 18, 42 14 C 48 12, 50 16, 48 20 C 40 24, 34 16, 24 20 C 20 21, 17 20, 16 18 Z"
            fill={color} opacity="0.3" />
          <circle cx="16" cy="56" r="3" fill={color} />
        </g>
      );
    case 4: // Districts & cities — a map pin cluster
      return wrap(
        <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 10 C42 10 48 18 48 27 C48 40 32 54 32 54 C32 54 16 40 16 27 C16 18 22 10 32 10 Z" fill={color} opacity="0.15" />
          <path d="M32 10 C42 10 48 18 48 27 C48 40 32 54 32 54 C32 54 16 40 16 27 C16 18 22 10 32 10 Z" />
          <circle cx="32" cy="27" r="6" fill={color} opacity="0.4" />
        </g>
      );
    case 5: // Land & nature — a mountain and leaf
      return wrap(
        <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 48 L24 20 L32 32 L40 16 L56 48 Z" fill={color} opacity="0.15" />
          <path d="M8 48 L24 20 L32 32 L40 16 L56 48 Z" />
          <path d="M46 40 C 52 36 54 30 52 24 C 46 26 42 32 44 40 Z" fill={color} opacity="0.3" />
        </g>
      );
    default:
      return wrap(<circle cx="32" cy="32" r="20" fill={color} opacity="0.2" stroke={color} strokeWidth="2.5" />);
  }
}
