/* =========================================================================
   APP  — state machine + persistent ambient layer + cinematic transitions.
   States: hub -> category -> project (and back).
   First visit plays IntroCinematic overlay; Hub is always mounted underneath
   so the avatar is visible through the intro. Nav/dossier gate on `active`.
   ========================================================================= */
const { Hub: _Hub, IntroCinematic: _Intro, CategoryView: _CatView, ProjectView: _ProjView, Icon: _Ic, sysVersion: _sv } = window;
// NOTE: window.PORTFOLIO is read lazily inside App (not at top level)
// so it's always defined by the time React renders, regardless of script load order.

function TopBar({ state, onHome, onReboot, onCredits, motion, onMotion, contact }) {
  const show = state !== 'boot';
  return (
    <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-8 py-4"
      style={{
        background: 'rgba(8,7,5,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--line)',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity .6s var(--ease), transform .6s var(--ease)', pointerEvents: show ? 'auto' : 'none',
      }}>
      <button onClick={onHome} disabled={state === 'hub'} className="group flex items-center gap-3"
        style={{ cursor: state === 'hub' ? 'default' : 'pointer' }}>
        <span className="grid place-items-center font-display" style={{ width: 30, height: 30, border: '1px solid var(--amber)', color: 'var(--amber)', fontWeight: 700, fontSize: 14, letterSpacing: '0.02em' }}>JY</span>
        <span className="hidden sm:block font-mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
          SYS.VER {_sv(contact.birth)} <span style={{ color: 'var(--fg-ghost)' }}>// {state === 'hub' ? 'HOME' : 'TRACE_ACTIVE'}</span>
        </span>
      </button>

      <div className="flex items-center gap-1.5">
        {[
          { label: motion ? 'Motion: On' : 'Motion: Off', fn: onMotion },
          { label: 'Credits', fn: onCredits },
        ].map((b, i) => (
          <button key={i} onClick={b.fn} className="font-mono px-2.5 h-7 flex items-center"
            style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-faint)', border: '1px solid var(--line)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-faint)'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
            {b.label}
          </button>
        ))}
        <button onClick={onReboot} title="Reboot" className="grid place-items-center h-7 w-7" style={{ color: 'var(--fg-faint)', border: '1px solid var(--line)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--amber)'; e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-faint)'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
          <_Ic name="reboot" size={13} />
        </button>
      </div>
    </div>
  );
}

function CreditsModal({ onClose, credits }) {
  return (
    <div className="absolute inset-0 z-[200] grid place-items-center px-5" style={{ background: 'rgba(6,5,4,0.74)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="relative w-full p-7" style={{ maxWidth: 460, background: 'var(--surface)', border: '1px solid var(--line-strong)' }} onClick={(e) => e.stopPropagation()}>
        <div className="mono-label mb-1.5" style={{ color: 'var(--amber)' }}>// Colophon</div>
        <h2 className="font-display mb-5" style={{ fontSize: 26, fontWeight: 700, textTransform: 'uppercase' }}>Credits</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="mono-label mb-1.5">Music</div>
            <div className="font-mono" style={{ fontSize: 11.5, color: 'var(--fg-dim)' }}>{credits.music}</div>
          </div>
          <div>
            <div className="mono-label mb-1.5">Sound Effects</div>
            <div className="flex flex-col gap-1">
              {credits.sfx.map((s, i) => <div key={i} className="font-mono" style={{ fontSize: 11.5, color: 'var(--fg-dim)' }}>{s}</div>)}
            </div>
          </div>
        </div>
        <div className="mono-label mt-7 text-center" style={{ fontSize: 8.5 }}>tap anywhere to close</div>
      </div>
    </div>
  );
}

function App() {
  // Read data lazily at render time — always safe, never races with data.js load
  if (!window.PORTFOLIO) {
    return <div style={{ color: 'var(--fg)', fontFamily: 'monospace', padding: 32 }}>ERR: data.js failed to load. Make sure Portfolio.html and data.js are in the same folder.</div>;
  }
  const { CONTACT, AI_NOTE, CREDITS, CATEGORIES } = window.PORTFOLIO;
  const booted = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('jy_booted');
  const [view, setView] = React.useState({ state: 'hub' });
  const [intro, setIntro] = React.useState(!booted);
  const [shown, setShown] = React.useState(true);
  const [tint, setTint] = React.useState(null);
  const [zoom, setZoom] = React.useState('in');
  const [showCredits, setCredits] = React.useState(false);
  const [motion, setMotion] = React.useState(true);
  const [fromBoot, setFromBoot] = React.useState(false);

  // --- glow tint: debounce the clear so crossing between nodes never flashes to
  //     null, and keep the LAST color so a real leave fades intensity, not color ---
  const [glowColor, setGlowColor] = React.useState('var(--amber)');
  const tintTimer = React.useRef(null);
  const setTintSafe = React.useCallback((c) => {
    clearTimeout(tintTimer.current);
    if (c) setTint(c);
    else tintTimer.current = setTimeout(() => setTint(null), 120);
  }, []);
  React.useEffect(() => { if (tint) setGlowColor(tint); }, [tint]);

  React.useEffect(() => {
    document.body.classList.toggle('reduce-motion', !motion);
  }, [motion]);

  // navigate with a brief fade/zoom veil so the swap is invisible
  const navigate = (next, dir = 'in') => {
    setZoom(dir);
    setShown(false);
    setTimeout(() => { setView(next); setShown(true); }, 340);
  };

  const finishIntro = () => {
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('jy_booted', '1');
    setIntro(false);
    setFromBoot(true);
    setTimeout(() => setFromBoot(false), 2700);
  };
  const goHub = () => { setTint(null); navigate({ state: 'hub' }, 'out'); };
  const openCat = (cat) => { setTint(window.accentOf(cat.accent)); navigate({ state: 'category', cat }, 'in'); };
  const openProject = (project) => navigate({ state: 'project', cat: view.cat, project }, 'in');
  const backToCat = () => navigate({ state: 'category', cat: view.cat }, 'out');
  const reboot = () => { if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('jy_booted'); setTint(null); setShown(true); setView({ state: 'hub' }); setIntro(true); };

  const onHub = view.state === 'hub';
  const deep = view.state === 'category' || view.state === 'project';
  // fixed glow geometry per view (NOT per hover — prevents the positional swing)
  const glowPos = deep ? '16% 55%' : '72% 46%';

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* ===== persistent ambient layer ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dotfield" style={{
          opacity: intro ? 0 : (deep ? 0.5 : 1),
          transform: deep ? 'scale(1.6)' : 'scale(1)',
        }} />
        {/* accent glow — fixed position; only color + opacity ease, so hovering
            between nodes is a smooth crossfade instead of a jump */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 60% 70% at ${glowPos}, ${glowColor}, transparent 62%)`,
          opacity: intro ? 0 : (deep ? 0.12 : (tint ? 0.14 : 0.09)),
          transition: 'opacity .5s var(--ease), background .55s var(--ease)',
          mixBlendMode: 'screen',
        }} />
        <div className="absolute inset-0 vignette" />
        {/* screen-corner ticks */}
        {!intro && [['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i)=>(
          <span key={i} className="absolute" style={{ [v]: 16, [h]: 16, width: 9, height: 9,
            [`border${v[0].toUpperCase()+v.slice(1)}`]: '1px solid var(--line)',
            [`border${h[0].toUpperCase()+h.slice(1)}`]: '1px solid var(--line)' }} />
        ))}
      </div>

      <TopBar state={intro ? 'boot' : view.state} onHome={goHub} onReboot={reboot} onCredits={() => setCredits(true)}
        motion={motion} onMotion={() => setMotion(m => !m)} contact={CONTACT} />

      {/* ===== view layer (cross-fade / zoom) ===== */}
      <div className="absolute inset-0" style={{
        opacity: shown ? 1 : 0,
        filter: shown ? 'blur(0px)' : 'blur(8px)',
        transform: shown ? 'scale(1)' : (zoom === 'in' ? 'scale(1.05)' : 'scale(0.965)'),
        transition: 'opacity .34s var(--ease), filter .34s var(--ease), transform .34s var(--ease)',
      }}>
        {view.state === 'hub' && (
          <_Hub contact={CONTACT} aiNote={AI_NOTE} categories={CATEGORIES} onSelect={openCat} onTint={setTintSafe} active={!intro} fromBoot={fromBoot} />
        )}
        {view.state === 'category' && (
          <_CatView cat={view.cat} onBack={goHub} onOpen={openProject} />
        )}
        {view.state === 'project' && (
          <_ProjView cat={view.cat} project={view.project} onBack={backToCat} />
        )}
      </div>

      {/* ===== first-visit intro cinematic (blocking, one-time) ===== */}
      {intro && <_Intro onComplete={finishIntro} contact={CONTACT} />}

      {showCredits && <CreditsModal onClose={() => setCredits(false)} credits={CREDITS} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
