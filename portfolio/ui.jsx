/* =========================================================================
   SHARED UI ATOMS  — icons, accent helpers, styled placeholders, HUD bits.
   Exported to window for the view modules.
   ========================================================================= */

const ACCENT_VAR = {
  game: 'var(--c-game)',
  dev:  'var(--c-dev)',
  num:  'var(--c-num)',
  ui:   'var(--c-ui)',
};
const accentOf = (key) => ACCENT_VAR[key] || 'var(--amber)';

/* ---- inline icon set (no icon-font dependency) ---- */
const ICONS = {
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  arrowOut: 'M7 17L17 7M9 7h8v8',
  mail: 'M3 6.5h18v11H3zM3 7l9 6 9-6',
  link: 'M9 15l6-6M8.5 8H6a3.5 3.5 0 000 7h2.5M15.5 16H18a3.5 3.5 0 000-7h-2.5',
  reboot: 'M3 12a9 9 0 109-9 9 9 0 00-6.4 2.7L3 8M3 4v4h4',
  close: 'M6 6l12 12M18 6L6 18',
  plus: 'M12 5v14M5 12h14',
  play: 'M8 5v14l11-7z',
  sound: 'M4 9v6h4l5 4V5L8 9zM16 8a5 5 0 010 8',
  muted: 'M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6',
  doc: 'M6 3h8l4 4v14H6zM14 3v4h4',
};

function Icon({ name, size = 16, stroke = 1.6, fill = 'none', className = '', style }) {
  const d = ICONS[name];
  const fillIcons = ['play'];
  const isFill = fillIcons.includes(name) || fill !== 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style}
      fill={isFill ? (fill === 'none' ? 'currentColor' : fill) : 'none'}
      stroke={isFill ? 'none' : 'currentColor'}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* A small rotated-square node marker (the recurring diamond motif) */
function Diamond({ size = 8, color = 'var(--amber)', glow = false }) {
  return (
    <span style={{
      width: size, height: size, background: color, display: 'inline-block',
      transform: 'rotate(45deg)',
      boxShadow: glow ? `0 0 12px ${color}` : 'none',
    }} />
  );
}

/* Corner-bracket frame — thin technical accent around panels */
function Corners({ color = 'var(--line-strong)', size = 10, inset = 0 }) {
  const base = { position: 'absolute', width: size, height: size, pointerEvents: 'none' };
  const s = (extra) => ({ ...base, ...extra });
  const o = inset;
  return (
    <React.Fragment>
      <span style={s({ top: o, left: o, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` })} />
      <span style={s({ top: o, right: o, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` })} />
      <span style={s({ bottom: o, left: o, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` })} />
      <span style={s({ bottom: o, right: o, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` })} />
    </React.Fragment>
  );
}

/* Styled image placeholder: tries to load the real image first.
   Falls back to hatch texture + mono caption if the file isn't found.
   When the real image loads it renders at its natural dimensions (width: 100%, height: auto).
   ratio: 'wide' (16/9) | 'tall' (3/4) | 'square' (1/1) | 'banner' (21/9) — only used for the placeholder */
const RATIO = { wide: '16 / 9', tall: '3 / 4', square: '1 / 1', banner: '21 / 9' };
function Placeholder({ label = 'image', ratio = 'wide', accent = 'var(--amber)', className = '', style }) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const showReal = loaded && !errored;

  // When real image is confirmed loaded: plain img at natural dimensions, no box constraint
  if (showReal) {
    return (
      <img
        src={label}
        alt={label}
        className={className}
        style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid var(--line)', ...style }}
      />
    );
  }

  return (
    <div
      className={'relative overflow-hidden ' + className}
      style={{
        aspectRatio: RATIO[ratio] || RATIO.wide,
        background: 'repeating-linear-gradient(135deg, rgba(241,235,221,0.035) 0px, rgba(241,235,221,0.035) 1px, transparent 1px, transparent 9px), var(--surface)',
        border: '1px solid var(--line)',
        ...style,
      }}
    >
      {/* invisible probe img — triggers load/error without being visible */}
      <img src={label} alt="" onLoad={() => setLoaded(true)} onError={() => setErrored(true)}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />

      <span style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '38%',
        background: `linear-gradient(to bottom, transparent, ${accent}0c, transparent)`,
        animation: 'sweep 6s linear infinite',
      }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span style={{ width: 22, height: 22, border: `1px solid ${accent}`, opacity: 0.7, display: 'grid', placeItems: 'center' }}>
          <span style={{ width: 5, height: 5, background: accent }} />
        </span>
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--fg-faint)' }}>{label}</span>
      </div>
      <span className="absolute top-2 left-2 mono-label" style={{ fontSize: 8.5 }}>IMG</span>
      <Corners color="var(--line)" size={8} inset={6} />
    </div>
  );
}

/* Mono "system version" derived from birthday, like the original */
function sysVersion(birth) {
  const b = new Date(birth[0], birth[1], birth[2]);
  const now = new Date();
  const beforeBday = now < new Date(now.getFullYear(), birth[1], birth[2]);
  const years = now.getFullYear() - b.getFullYear() - (beforeBday ? 1 : 0);
  const months = (now.getMonth() - birth[1] + 12) % 12;
  return `${years}.${String(months).padStart(2, '0')}`;
}

/* Ghost button used across views */
function GhostButton({ children, onClick, accent = 'var(--amber)', className = '', as = 'button', href, icon }) {
  const Cmp = as;
  const extra = as === 'a' ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };
  return (
    <Cmp
      {...extra}
      className={'group relative inline-flex items-center gap-2.5 px-5 py-2.5 cursor-pointer select-none ' + className}
      style={{ border: '1px solid var(--line-strong)', color: 'var(--fg)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
    >
      {icon}
      <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{children}</span>
    </Cmp>
  );
}

Object.assign(window, {
  accentOf, ACCENT_VAR, Icon, ICONS, Diamond, Corners, Placeholder, sysVersion, GhostButton,
});
