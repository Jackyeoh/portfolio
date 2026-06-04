/* =========================================================================
   INTRO CINEMATIC — one-time centered narrative played over the hub avatar.
   Beats: JACK YEOH -> role -> thesis -> CTA -> (resolve to hub).
   Blocking by design (first visit only). Click advances a beat; on the last
   beat it resolves. Auto-advances on a timer too. The Hub is already mounted
   underneath (avatar visible); this overlay is transparent in the center.
   ========================================================================= */
function IntroCinematic({ onComplete, contact }) {
  const DUR = [1200, 1500, 2900, 1600];
  const [waiting, setWaiting] = React.useState(true);
  const [loading, setLoading] = React.useState(false); // bar phase
  const [barDone, setBarDone] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [ripple, setRipple] = React.useState(null); // { x, y, key }
  const doneRef = React.useRef(false);

  const finish = React.useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(onComplete, 350);
  }, [onComplete]);

  const advance = React.useCallback((e) => {
    if (waiting) {
      // first tap: fire ripple + loading bar, then start sequence after bar completes
      const x = e ? e.clientX : window.innerWidth / 2;
      const y = e ? e.clientY : window.innerHeight / 2;
      setRipple({ x, y, key: Date.now() });
      setTimeout(() => setLoading(true), 500);
      setTimeout(() => setBarDone(true), 1360);   // bar completes
      setTimeout(() => setWaiting(false), 1460);  // slight hold after bar fills
      return;
    }
    setStage((s) => { if (s >= DUR.length - 1) { finish(); return s; } return s + 1; });
  }, [waiting, finish]);

  // auto-advance only kicks in once the user has started the sequence
  React.useEffect(() => {
    if (waiting || exiting) return;
    const t = setTimeout(() => {
      if (stage >= DUR.length - 1) finish();
      else setStage(stage + 1);
    }, DUR[stage]);
    return () => clearTimeout(t);
  }, [stage, waiting, exiting, finish]);

  // teleprompter rise: current beat centered, past beats drift up, future drift down
  const beat = (i) => ({
    position: 'absolute', left: '50%', top: '50%', width: 'min(86vw, 680px)',
    transform: `translate(-50%, -50%) translateY(${stage === i ? 0 : (stage > i ? -28 : 28)}px)`,
    opacity: !exiting && stage === i ? 1 : 0,
    transition: 'opacity .6s var(--ease), transform .7s var(--ease)',
    textAlign: 'center', pointerEvents: 'none',
  });

  return (
    <div onClick={advance}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none"
      style={{ background: 'transparent' }}>

      <style>{`
        @keyframes gridscroll { to { background-position: 0 -560px; } }
        @keyframes bar-load {
          0%   { width: 0% }
          25%  { width: 52% }
          55%  { width: 74% }
          78%  { width: 88% }
          100% { width: 100% }
        }
        @keyframes ripple-out {
          0%   { width: 0; height: 0; opacity: 1; }
          60%  { opacity: 0.6; }
          100% { width: 120vmax; height: 120vmax; opacity: 0; }
        }
      `}</style>

      {/* perspective grid floor */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: '52vh', perspective: '780px',
          opacity: exiting ? 0 : 1, transition: 'opacity .5s var(--ease)',
          maskImage: 'linear-gradient(to top, #000 0%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 70%)',
        }}>
        <div className="absolute bottom-0 left-[-50%] w-[200%] h-[200vh]"
          style={{
            transformOrigin: 'bottom center', transform: 'rotateX(72deg)',
            backgroundImage: 'radial-gradient(circle at center, rgba(255,176,0,0.4) 1.2px, transparent 2px)',
            backgroundSize: '56px 56px', backgroundPositionX: 'center',
            animation: 'gridscroll 9s linear infinite',
          }} />
      </div>

      {/* center scrim — darkens the avatar locally so text stays legible */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 52% 46% at 50% 48%, rgba(8,7,5,0.82), transparent 70%)',
          opacity: exiting ? 0 : 1, transition: 'opacity .5s var(--ease)',
        }} />

      {/* BEATS */}
      <div className="absolute inset-0">

        {/* 0 — name */}
        <div style={beat(0)}>
          <div className="mono-label" style={{ marginBottom: 14, letterSpacing: '0.5em', opacity: 0.7 }}>Portfolio</div>
          <h1 className="font-display" style={{
            fontWeight: 700, fontSize: 'clamp(56px, 11vw, 150px)',
            lineHeight: 0.84, letterSpacing: '-0.01em', textTransform: 'uppercase',
            color: 'var(--fg)', margin: 0,
          }}>
            Jack<br />Yeoh
          </h1>
        </div>

        {/* 1 — role */}
        <div style={beat(1)}>
          <div className="flex items-center justify-center gap-3">
            <span style={{ width: 7, height: 7, background: 'var(--amber)', transform: 'rotate(45deg)', flexShrink: 0 }} />
            <span className="font-mono" style={{
              fontSize: 'clamp(14px,1.8vw,20px)', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--fg)',
            }}>{contact.role}</span>
            <span style={{ width: 7, height: 7, background: 'var(--amber)', transform: 'rotate(45deg)', flexShrink: 0 }} />
          </div>
        </div>

        {/* 2 — thesis */}
        <div style={beat(2)}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(20px,2.7vw,32px)',
            lineHeight: 1.4, color: 'var(--fg)', margin: 0, textWrap: 'balance',
          }}>
            I design and build games — systems, code, balance, and the UX in between.
          </p>
          <div style={{
            height: 4, width: 120, margin: '22px auto 0',
            background: 'linear-gradient(90deg, transparent, var(--amber), transparent)',
            transform: stage === 2 ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform .8s var(--ease) .2s',
          }} />
        </div>

        {/* 3 — cta */}
        <div style={beat(3)}>
          <span className="font-mono" style={{
            fontSize: 'clamp(12px,1.4vw,15px)', letterSpacing: '0.26em',
            textTransform: 'uppercase', color: 'var(--amber)',
          }}>
            Check out my core competencies
          </span>
        </div>

      </div>

      {/* ripple burst on first tap */}
      {ripple && (
        <span key={ripple.key} style={{
          position: 'fixed',
          left: ripple.x, top: ripple.y,
          width: 0, height: 0,
          borderRadius: '50%',
          border: '2px solid rgba(255,176,0,0.75)',
          transform: 'translate(-50%,-50%)',
          animation: 'ripple-out 1.1s cubic-bezier(0.22,1,0.36,1) forwards',
          pointerEvents: 'none', zIndex: 60,
        }} />
      )}

      {/* second ring — slightly larger, delayed */}
      {ripple && (
        <span key={ripple.key + 1} style={{
          position: 'fixed',
          left: ripple.x, top: ripple.y,
          width: 0, height: 0,
          borderRadius: '50%',
          border: '1px solid rgba(255,176,0,0.45)',
          transform: 'translate(-50%,-50%)',
          animation: 'ripple-out 1.5s cubic-bezier(0.22,1,0.36,1) 0.14s forwards',
          pointerEvents: 'none', zIndex: 60,
        }} />
      )}

      {/* third ring — faintest, most delayed */}
      {ripple && (
        <span key={ripple.key + 2} style={{
          position: 'fixed',
          left: ripple.x, top: ripple.y,
          width: 0, height: 0,
          borderRadius: '50%',
          border: '1px solid rgba(255,176,0,0.2)',
          transform: 'translate(-50%,-50%)',
          animation: 'ripple-out 1.9s cubic-bezier(0.22,1,0.36,1) 0.28s forwards',
          pointerEvents: 'none', zIndex: 60,
        }} />
      )}

      {/* loading bar — top of screen, organic fill */}
      {loading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, zIndex: 70,
          height: 2, width: barDone ? '100%' : '0%',
          background: 'linear-gradient(90deg, rgba(255,176,0,0.2), var(--amber), rgba(255,255,200,0.9))',
          boxShadow: '0 0 10px rgba(255,176,0,0.7), 0 0 24px rgba(255,176,0,0.3)',
          animation: barDone ? 'none' : 'bar-load 860ms cubic-bezier(0.25,0.1,0.2,1) forwards',
          opacity: barDone ? 0 : 1,
          transition: barDone ? 'opacity 0.35s ease 0.1s, width 0.12s ease' : 'none',
          pointerEvents: 'none',
        }} />
      )}

      {/* skip / continue hint — only shown while waiting */}
      <div className="absolute bottom-7 left-0 w-full flex justify-center pointer-events-none"
        style={{ opacity: waiting && !exiting ? 0.55 : 0, transition: 'opacity .5s var(--ease)' }}>
        <span className="font-mono flex items-center gap-2" style={{
          fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--fg-dim)',
        }}>
          <span style={{ width: 6, height: 6, background: 'var(--amber)', animation: 'blink 1.4s ease-in-out infinite' }} />
          Tap to begin
        </span>
      </div>
    </div>
  );
}

window.IntroCinematic = IntroCinematic;
