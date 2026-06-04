/* =========================================================================
   HUB  — static constellation selector with guided first-visit choreography.
   - Boot name "docks" to the corner dossier card (fromBoot glow).
   - Thesis line frames the site in one sentence.
   - Core Competencies wrapper (Game Design + Game Dev) with breathing ring.
   - Support pair (Numerical + UI/UX) labelled clearly below.
   ========================================================================= */
const { accentOf: _accentOf, Icon: _Icon, Corners: _Corners } = window;

/* ── image helpers: data-URI fallback → upgrade to real file silently ── */
function SelfieImg() {
  const [src, setSrc] = React.useState(window.PLACEHOLDER_SELFIE || null);
  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setSrc('selfie.png');
    img.src = 'assets/selfie.png';
  }, []);
  return (
    <div className="relative shrink-0 overflow-hidden"
      style={{ width: 58, height: 74, border: '1px solid var(--line-strong)' }}>
      {src
        ? <img src={src} alt="Jack Yeoh"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        : <span className="absolute inset-0 grid place-items-center font-mono"
            style={{ fontSize: 7.5, letterSpacing: '0.1em', color: 'var(--fg-faint)', background: '#0a0907' }}>selfie</span>
      }
    </div>
  );
}

function AvatarImg() {
  const [src, setSrc] = React.useState(window.PLACEHOLDER_AVATAR || null);
  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setSrc('assets/avatar-full.png');
    img.src = 'assets/avatar-full.png';
  }, []);
  return (
    <div className="relative" style={{ height: '70vh', width: '26vh', maxWidth: 320 }}>
      {src
        ? <img src={src} alt="Jack Yeoh"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
              maskImage: 'linear-gradient(to bottom, #000 60%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 60%, transparent 96%)',
            }} />
        : <>
            <div className="absolute inset-0 overflow-hidden" style={{
              background: 'repeating-linear-gradient(135deg, rgba(241,235,221,0.025) 0 1px, transparent 1px 11px)',
              maskImage: 'linear-gradient(to bottom, #000 55%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 96%)',
              opacity: 0.5,
            }} />
            <span className="absolute left-1/2 -translate-x-1/2 font-mono"
              style={{ bottom: '14%', fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--fg-faint)' }}>
              avatar-full.png
            </span>
          </>
      }
    </div>
  );
}

/* ── one-sentence welcome thesis ── */
function ThesisLine({ ready, fromBoot }) {
  const delay = fromBoot ? 0.5 : 0.3;
  return (
    <div style={{
      opacity: ready ? 1 : 0,
      transform: ready ? 'translateX(0)' : 'translateX(16px)',
      transition: `all 0.85s var(--ease) ${delay}s`,
      textAlign: 'right',
      marginBottom: 20,
      maxWidth: 400,
      marginLeft: 'auto',
    }}>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.54,
        color: 'var(--fg-dim)', margin: 0,
      }}>
        I design and build games — systems, code, balance, and the UX in between.
      </p>
      <span className="font-mono" style={{
        display: 'inline-block', marginTop: 8, fontSize: 9.5,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: 'var(--amber)', opacity: 0.7,
      }}>
        Pick a discipline to go deeper ↓
      </span>
    </div>
  );
}

/* ── breathing ring wrapper for the core competency pair ── */
function CoreWrapper({ children, ready, delay = 0.8 }) {
  return (
    <div className="relative" style={{ paddingLeft: 8 }}>
      {/* corner brackets — precise Endfield operator-selection framing */}
      {[
        { top: -10, left: -8, borderTop: '1px solid', borderLeft: '1px solid' },
        { top: -10, right: -8, borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: -10, left: -8, borderBottom: '1px solid', borderLeft: '1px solid' },
        { bottom: -10, right: -8, borderBottom: '1px solid', borderRight: '1px solid' },
      ].map((s, i) => (
        <span key={i} style={{
          position: 'absolute', width: 12, height: 12,
          borderColor: 'rgba(255,176,0,0.5)',
          opacity: ready ? 1 : 0,
          transition: `opacity 0.5s var(--ease) ${delay + i * 0.06}s`,
          ...s,
        }} />
      ))}

      {/* left accent bar */}
      <span style={{
        position: 'absolute', left: -8, top: 0, bottom: 0, width: 2,
        background: 'linear-gradient(to bottom, transparent, rgba(255,176,0,0.35), transparent)',
        opacity: ready ? 1 : 0,
        transition: `opacity 0.6s var(--ease) ${delay}s`,
      }} />

      {/* label */}
      <div style={{
        position: 'absolute', top: -18, right: 0,
        fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.24em',
        textTransform: 'uppercase', color: 'var(--amber)',
        opacity: ready ? 0.8 : 0,
        transition: `opacity 0.5s var(--ease) ${delay + 0.15}s`,
        pointerEvents: 'none', whiteSpace: 'nowrap',
        animation: ready ? 'core-pulse-label 3.6s ease-in-out infinite' : 'none',
      }}>Core Competencies</div>

      <div className="flex flex-col gap-7 md:gap-9" style={{ paddingTop: 6, paddingBottom: 6 }}>
        {children}
      </div>
    </div>
  );
}

/* ── operator dossier card (bottom-left) ── */
function AINote({ aiNote }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ background: 'rgba(16,14,10,0.82)', border: '1px solid var(--line)', backdropFilter: 'blur(14px)' }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3">
        <span className="mono-label flex items-center gap-2" style={{ letterSpacing: '0.24em' }}>
          <_Icon name="doc" size={12} style={{ color: 'var(--fg-faint)' }} />
          Field_Note // On_AI
        </span>
        <_Icon name="chevronDown" size={13} style={{
          color: 'var(--fg-faint)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform .3s',
        }} />
      </button>
      <div style={{ maxHeight: open ? 260 : 0, opacity: open ? 1 : 0, overflow: 'hidden', transition: 'all .4s var(--ease)' }}>
        <div className="px-4 pb-4 flex flex-col gap-2" style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
          {aiNote.map((p, i) => (
            <p key={i} className="font-mono" style={{ fontSize: 10.5, lineHeight: 1.65, color: 'var(--fg-dim)', borderLeft: '2px solid var(--line-strong)', paddingLeft: 10 }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dossier({ contact, aiNote, ready, fromBoot }) {
  // When arriving from boot, card is already at the corner — no slide-in needed.
  // Pulse the amber border briefly to confirm the "dock" landing.
  const [glowing, setGlowing] = React.useState(fromBoot);
  React.useEffect(() => {
    if (fromBoot) {
      const t = setTimeout(() => setGlowing(false), 1500);
      return () => clearTimeout(t);
    }
  }, [fromBoot]);

  return (
    <div
      className="absolute z-40 left-5 md:left-8 bottom-5 md:bottom-8 w-[min(86vw,360px)] flex flex-col gap-2.5"
      style={{
        opacity: fromBoot ? 1 : (ready ? 1 : 0),
        transform: fromBoot ? 'translateX(0)' : (ready ? 'translateX(0)' : 'translateX(-24px)'),
        transition: fromBoot ? 'none' : 'all 1s var(--ease) 0.5s',
      }}
    >
      <div className="relative p-4 md:p-5" style={{
        background: 'rgba(16,14,10,0.88)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${glowing ? 'rgba(255,176,0,0.55)' : 'var(--line)'}`,
        boxShadow: glowing ? '0 0 32px rgba(255,176,0,0.11), inset 0 0 24px rgba(255,176,0,0.03)' : 'none',
        transition: 'border-color 1.1s var(--ease) 0.15s, box-shadow 1.1s var(--ease) 0.15s',
      }}>
        <_Corners color="var(--amber)" size={8} inset={-1} />
        <div className="flex items-center gap-2 mb-3.5">
          <span style={{ width: 6, height: 6, background: 'var(--amber)', transform: 'rotate(45deg)' }} />
          <span className="mono-label" style={{ color: 'var(--amber)', letterSpacing: '0.28em' }}>Operator // Profile</span>
        </div>
        <div className="flex gap-3.5 items-start">
          <SelfieImg />
          <div className="min-w-0 flex flex-col gap-2">
            <div>
              <h2 className="font-display" style={{ fontSize: 26, lineHeight: 0.92, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.01em' }}>{contact.name}</h2>
              <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginTop: 3 }}>{contact.role}</div>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--fg-dim)' }}>{contact.blurb}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mt-3.5 pt-3" style={{ borderTop: '1px solid var(--line)' }}>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 group" style={{ color: 'var(--fg-dim)' }}>
            <_Icon name="mail" size={13} style={{ color: 'var(--fg-faint)' }} />
            <span className="font-mono group-hover:text-[var(--amber)]" style={{ fontSize: 11, letterSpacing: '0.06em', transition: 'color .2s' }}>{contact.email}</span>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group" style={{ color: 'var(--fg-dim)' }}>
            <_Icon name="link" size={13} style={{ color: 'var(--fg-faint)' }} />
            <span className="font-mono group-hover:text-[var(--amber)]" style={{ fontSize: 11, letterSpacing: '0.06em', transition: 'color .2s' }}>{contact.linkedinLabel}</span>
            <_Icon name="arrowOut" size={10} style={{ color: 'var(--fg-faint)' }} />
          </a>
        </div>
      </div>
      <AINote aiNote={aiNote} />
    </div>
  );
}

/* ── single discipline node ── */
function ConstNode({ cat, i, ready, onHover, onLeave, onSelect, isCore, delay = 0 }) {
  const accent = _accentOf(cat.accent);
  const [hover, setHover] = React.useState(false);
  const arc = [70, 14, 14, 70][i] || 14;

  return (
    <button
      onMouseEnter={() => { setHover(true); onHover(accent); }}
      onMouseLeave={() => { setHover(false); onLeave(); }}
      onFocus={() => { setHover(true); onHover(accent); }}
      onBlur={() => { setHover(false); onLeave(); }}
      onClick={() => onSelect(cat)}
      className="group relative flex items-center justify-end gap-4 text-right cursor-pointer w-full"
      style={{
        marginRight: arc,
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateX(0)' : 'translateX(40px)',
        transition: `opacity .7s var(--ease) ${delay}s, transform .7s var(--ease) ${delay}s`,
      }}
    >
      <div className="flex flex-col items-end">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono" style={{
            fontSize: 11, letterSpacing: '0.2em',
            color: hover ? accent : 'var(--fg-faint)',
            transition: 'color .25s',
          }}>{cat.index}</span>
          <span className="font-display" style={{
            fontSize: isCore ? 'clamp(24px, 2.8vw, 38px)' : 'clamp(22px, 2.7vw, 36px)',
            fontWeight: isCore ? 700 : 500,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            letterSpacing: '0.005em',
            whiteSpace: 'nowrap',
            color: hover ? 'var(--fg)' : (isCore ? 'var(--fg)' : 'var(--fg-dim)'),
            transition: 'color .25s',
          }}>{cat.title}</span>
        </div>
        <span className="font-mono" style={{
          fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4,
          color: hover ? accent : (isCore ? 'rgba(241,235,221,0.44)' : 'var(--fg-faint)'),
          transition: 'color .25s',
        }}>{cat.tagline}</span>
      </div>

      {/* connector + diamond node */}
      <div className="relative flex items-center" style={{ width: 80 }}>
        <span style={{
          position: 'absolute', right: 20, height: 1,
          left: hover ? 0 : 28,
          background: `linear-gradient(90deg, transparent, ${hover ? accent : 'var(--line-strong)'})`,
          transition: 'left .3s var(--ease), background .25s',
        }} />
        <span className="absolute right-0 grid place-items-center" style={{
          width: 20, height: 20,
          border: `1px solid ${hover ? accent : (isCore ? 'rgba(255,176,0,0.32)' : 'var(--line-strong)')}`,
          transform: `rotate(45deg) scale(${hover ? 1.15 : 1})`,
          transition: 'all .25s var(--ease)',
        }}>
          <span style={{
            width: 5, height: 5, background: accent,
            boxShadow: hover
              ? `0 0 10px ${accent}`
              : (isCore ? `0 0 5px ${accent}55` : 'none'),
            transition: 'box-shadow .25s',
          }} />
        </span>
      </div>
    </button>
  );
}

/* ── mobile-specific avatar: full-bleed, objectFit cover, gradient overlay for fade ── */
function MobileAvatarImg() {
  const [src, setSrc] = React.useState(window.PLACEHOLDER_AVATAR || null);
  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setSrc('assets/avatar-full.png');
    img.src = 'assets/avatar-full.png';
  }, []);
  return src ? (
    <img src={src} alt="Jack Yeoh" style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'top center',
    }} />
  ) : (
    <div style={{ position: 'absolute', inset: 0,
      background: 'repeating-linear-gradient(135deg, rgba(241,235,221,0.025) 0 1px, transparent 1px 11px)' }} />
  );
}

/* ── mobile discipline row ── */
function MobileNode({ cat, isCore, onSelect, onTint }) {
  const accent = _accentOf(cat.accent);
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onMouseEnter={() => { setHover(true); onTint(accent); }}
      onMouseLeave={() => { setHover(false); onTint(null); }}
      onClick={() => onSelect(cat)}
      className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
      style={{ borderBottom: '1px solid var(--line)', paddingLeft: hover ? 10 : 0, transition: 'padding .2s var(--ease)' }}>
      <div>
        <div className="font-display" style={{
          fontSize: isCore ? 28 : 22, fontWeight: isCore ? 700 : 500,
          textTransform: 'uppercase', letterSpacing: '-0.01em',
          color: hover ? 'var(--fg)' : (isCore ? 'var(--fg)' : 'var(--fg-dim)'),
          transition: 'color .2s',
        }}>{cat.title}</div>
        <div className="font-mono mt-1" style={{
          fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: hover ? accent : 'var(--fg-faint)', transition: 'color .2s',
        }}>{cat.tagline}</div>
      </div>
      <div className="flex items-center gap-2.5 shrink-0 ml-4">
        <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--fg-faint)' }}>{cat.index}</span>
        <span style={{
          width: 22, height: 22, border: `1px solid ${hover ? accent : 'var(--line-strong)'}`,
          transform: 'rotate(45deg)', display: 'grid', placeItems: 'center',
          transition: 'border-color .2s',
        }}>
          <span style={{ width: 6, height: 6, background: accent, transform: 'rotate(-45deg)' }} />
        </span>
      </div>
    </button>
  );
}

/* ── hub ── */
function Hub({ contact, aiNote, categories, onSelect, onTint, fromBoot, active }) {
  const [mounted, setMounted] = React.useState(false);
  const [navReady, setNavReady] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  React.useEffect(() => {
    if (active && mounted) {
      // 50ms gap ensures React commits active=true (opacity:0) BEFORE
      // navReady=true (opacity:1), so the browser sees a genuine 0→1 and fires.
      const t = setTimeout(() => setNavReady(true), 50);
      return () => clearTimeout(t);
    } else {
      setNavReady(false);
    }
  }, [active, mounted]);
  const ready = navReady;   // nav / dossier / center-label
  // avatar uses `mounted` directly (always shows during intro)

  // top-down cascade delays (seconds). Wider spread on first visit (fromBoot).
  const seq = fromBoot
    ? { label: 0.15, core: [0.35, 0.52], ring: 0.82, divider: 1.02, support: [1.18, 1.34] }
    : { label: 0.04, core: [0.12, 0.20], ring: 0.30, divider: 0.36, support: [0.42, 0.50] };

  const core    = categories.slice(0, 2);   // Game Design + Game Development
  const support = categories.slice(2);      // Numerical + UI/UX

  /* ===== MOBILE LAYOUT ===== */
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-10 flex flex-col overflow-hidden">
        {/* avatar strip — full-bleed, overflow:hidden, gradient overlay fades bottom cleanly */}
        <div className="relative flex-shrink-0 overflow-hidden" style={{ height: '52vh' }}>
          {/* ring decoration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1.2s var(--ease) .2s' }}>
            <span style={{ width: '80vw', height: '80vw', borderRadius: '50%', border: '1px dashed rgba(241,235,221,0.07)' }} />
          </div>
          {/* avatar — fills strip, objectFit:cover keeps it centered */}
          <MobileAvatarImg />
          {/* scan sweep */}
          <span style={{ position:'absolute', left:0, right:0, top:0, height:'20%', background:'linear-gradient(to bottom, transparent, rgba(255,176,0,0.06), transparent)', animation:'sweep 7s linear infinite', pointerEvents:'none', zIndex:2 }} />
          {/* gradient fade to bg — overlay div avoids maskImage/clip seam */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'linear-gradient(transparent, var(--bg))', pointerEvents:'none', zIndex:3 }} />
          <div className="absolute bottom-3 w-full flex justify-center"
            style={{ opacity: ready ? 1 : 0, transition: 'opacity .6s var(--ease) .1s', zIndex:4 }}>
            <span className="mono-label" style={{ letterSpacing:'0.35em', fontSize:8 }}>core // jack_yeoh</span>
          </div>
        </div>

        {/* discipline list — opaque bg blocks avatar bleed-through on scroll */}
        <div className="flex-1 overflow-y-auto scroll-thin" style={{ background: 'var(--bg)', opacity: ready ? 1 : 0, transition: 'opacity .5s var(--ease) .2s' }}>
          <div className="px-5 pt-2 pb-32">
            <div className="mono-label text-center mb-5" style={{ letterSpacing:'0.3em' }}>Select Discipline — 04</div>
            <div className="mono-label flex items-center gap-3 mb-3"
              style={{ color:'var(--amber)', fontSize:8, letterSpacing:'0.22em' }}>
              <span style={{ height:1, flex:1, background:'rgba(255,176,0,0.2)' }} />
              Core Competencies
              <span style={{ height:1, flex:1, background:'rgba(255,176,0,0.2)' }} />
            </div>
            {core.map((cat) => (
              <MobileNode key={cat.id} cat={cat} isCore={true} onSelect={onSelect} onTint={onTint} />
            ))}
            <div className="mono-label flex items-center gap-3 my-4" style={{ fontSize:8, letterSpacing:'0.22em', opacity:0.5 }}>
              <span style={{ height:1, flex:1, background:'var(--line-strong)' }} />
              Supporting Skills
              <span style={{ height:1, flex:1, background:'var(--line-strong)' }} />
            </div>
            {support.map((cat) => (
              <MobileNode key={cat.id} cat={cat} isCore={false} onSelect={onSelect} onTint={onTint} />
            ))}
          </div>
        </div>

        {/* bottom contact strip */}
        <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3"
          style={{ background:'rgba(12,11,8,0.92)', borderTop:'1px solid var(--line)', backdropFilter:'blur(12px)',
                   opacity: ready ? 1 : 0, transition: 'opacity .6s var(--ease) .6s' }}>
          <div className="flex flex-col">
            <span className="font-display" style={{ fontSize:16, fontWeight:700, textTransform:'uppercase', lineHeight:1 }}>{contact.name}</span>
            <span className="font-mono" style={{ fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--amber)', marginTop:2 }}>{contact.role}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${contact.email}`} style={{ color:'var(--fg-dim)', display:'grid', placeItems:'center' }}>
              <_Icon name="mail" size={18} />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color:'var(--fg-dim)', display:'grid', placeItems:'center' }}>
              <_Icon name="link" size={18} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ===== DESKTOP LAYOUT ===== */
  return (
    <div className="absolute inset-0 z-10">
      {/* ambient: avatar + reticle framing + slow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1.4s var(--ease) .2s' }}>

        {/* rings — slightly more visible so they read as UI, not noise */}
        <div className="absolute" style={{ width: '64vh', height: '64vh' }}>
          <span className="absolute inset-0 rounded-full"
            style={{ border: '1px dashed rgba(241,235,221,0.10)', animation: 'spin360 90s linear infinite' }} />
          <span className="absolute rounded-full"
            style={{ inset: '7%', border: '1px solid rgba(241,235,221,0.06)', animation: 'spin360r 120s linear infinite' }} />
          <span className="absolute rounded-full"
            style={{ inset: '20%', border: '1px dashed rgba(255,176,0,0.10)' }} />
        </div>

        {/* operator-selection compass brackets — N/S/E/W of the avatar */}
        {[0, 90, 180, 270].map((deg) => (
          <span key={deg} className="absolute" style={{
            width: 12, height: 12,
            borderTop: '1px solid rgba(255,176,0,0.4)',
            borderLeft: '1px solid rgba(255,176,0,0.4)',
            transformOrigin: 'center',
            transform: `rotate(${deg}deg) translateY(-17vh)`,
          }} />
        ))}

        {/* avatar with scan sweep overlay */}
        <div className="relative" style={{ height: '70vh', width: '26vh', maxWidth: 320 }}>
          <AvatarImg />
          {/* scan sweep — slow soft horizontal light crossing the portrait */}
          <span style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: '22%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,176,0,0.07), transparent)',
            animation: 'sweep 7s linear infinite',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s var(--ease) .8s' }}>
        <span className="mono-label" style={{ letterSpacing: '0.4em', fontSize: 9 }}>core // jack_yeoh</span>
      </div>

      {/* RIGHT: constellation panel — overflow:visible so the CoreWrapper ring isn't clipped */}
      <div className="absolute z-30 right-6 md:right-[7vw] top-1/2 -translate-y-1/2
                      flex flex-col gap-0 w-[min(75vw,440px)]" style={{ overflow: 'visible' }}>

        {/* section label */}
        <div className="text-right mb-5"
          style={{ opacity: ready ? 1 : 0, transition: `opacity .6s var(--ease) ${seq.label}s` }}>
          <span className="mono-label" style={{ letterSpacing: '0.3em' }}>Select Discipline — 04</span>
        </div>

        {/* CORE PAIR */}
        {/* padding wrapper absorbs the ring's -12/-8 negative inset so it stays visible */}
        <div style={{ padding: '14px 10px', margin: '-14px -10px' }}>
          <CoreWrapper ready={ready} delay={seq.ring}>
            {core.map((cat, i) => (
              <ConstNode key={cat.id} cat={cat} i={i} ready={ready} delay={seq.core[i]} isCore={true}
                onHover={onTint} onLeave={() => onTint(null)} onSelect={onSelect} />
            ))}
          </CoreWrapper>
        </div>

        {/* divider */}
        <div className="flex items-center justify-end gap-3 my-7"
          style={{ opacity: ready ? 0.45 : 0, transition: `opacity .6s var(--ease) ${seq.divider}s` }}>
          <span className="mono-label" style={{ fontSize: 8.5 }}>Supporting skills</span>
          <span style={{ height: 1, width: 32, background: 'var(--line-strong)' }} />
        </div>

        {/* SUPPORT PAIR */}
        <div className="flex flex-col gap-7 md:gap-9">
          {support.map((cat, i) => (
            <ConstNode key={cat.id} cat={cat} i={i + 2} ready={ready} delay={seq.support[i]} isCore={false}
              onHover={onTint} onLeave={() => onTint(null)} onSelect={onSelect} />
          ))}
        </div>
      </div>

      {/* persistent bottom HUD strip — always visible on hub, like Endfield's edge data bars */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          opacity: ready ? 1 : 0,
          transition: `opacity .6s var(--ease) ${seq.support[1] + 0.2}s`,
        }}>
        <div className="flex items-center justify-between px-5 md:px-8 py-3"
          style={{ borderTop: '1px solid var(--line)' }}>
          <div className="flex items-center gap-5">
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'var(--fg-faint)' }}>
              SYS // OPERATOR_PROFILE_LOADED
            </span>
            <span style={{ width: 4, height: 4, background: 'var(--amber)', transform: 'rotate(45deg)', opacity: 0.6 }} />
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--fg-faint)' }}>
              DISCIPLINES_ACTIVE // 04
            </span>
          </div>
          <span className="font-mono flex items-center gap-2" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'var(--fg-faint)' }}>
            <span style={{ width: 5, height: 5, background: 'oklch(0.72 0.14 142)', borderRadius: '50%', animation: 'blink 2.8s ease-in-out infinite' }} />
            SYSTEM_NOMINAL
          </span>
        </div>
      </div>

      <Dossier contact={contact} aiNote={aiNote} ready={ready} fromBoot={fromBoot} />
    </div>
  );
}

Object.assign(window, { Hub });
