/* =========================================================================
   INNER VIEWS  — one unified system replaces the three divergent layouts.
   CategoryView : a discipline's project index.
   ProjectView  : a single project as an editorial case study.
   The same block renderer drives every project, including the numerical
   "worksheet" cases, so nothing feels like a different app anymore.
   ========================================================================= */
const {
  accentOf: __accentOf, Icon: __Icon, Placeholder: __PH, Corners: __Corners, GhostButton: __Ghost,
} = window;

/* ---------- block renderer ---------- */
function Block({ block, accent }) {
  switch (block.kind) {
    case 'lead':
      return <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--fg)', fontWeight: 400 }}>{block.text}</p>;
    case 'para':
      return <p style={{ fontSize: 14.5, lineHeight: 1.62, color: 'var(--fg-dim)' }}>{block.text}</p>;
    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => {
            const ci = item.indexOf(': ');
            const label = ci !== -1 ? item.slice(0, ci) : null;
            const body = ci !== -1 ? item.slice(ci + 2) : item;
            return (
              <li key={i} className="flex items-start gap-3" style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-dim)' }}>
                <span style={{ width: 6, height: 6, marginTop: 7, flexShrink: 0, background: accent, transform: 'rotate(45deg)' }} />
                <span>{label && <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{label}: </span>}{body}</span>
              </li>
            );
          })}
        </ul>
      );
    case 'image':
      return <__PH label={block.label} ratio={block.ratio || 'wide'} accent={accent} />;
    case 'gallery':
      return (
        <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${Math.min(block.items.length, 3)}, 1fr)` }}>
          {block.items.map((g, i) => <__PH key={i} label={g.label} ratio="square" accent={accent} />)}
        </div>
      );
    case 'note':
      return (
        <div className="relative px-4 py-3" style={{ background: 'rgba(241,235,221,0.03)', borderLeft: `2px solid ${accent}` }}>
          <div className="mono-label mb-1" style={{ color: accent, fontSize: 8.5 }}>Note</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-dim)' }}>{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

/* ---------- PROJECT DEEP-DIVE ---------- */
function ProjectView({ cat, project, onBack }) {
  const accent = __accentOf(cat.accent);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setReady(true), 30); return () => clearTimeout(t); }, []);

  const reveal = (d = 0) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? 'translateY(0)' : 'translateY(16px)',
    transition: `all .7s var(--ease) ${d}s`,
  });

  return (
    <div className="absolute inset-0 z-20 overflow-y-auto scroll-thin">
      <div className="mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-28" style={{ maxWidth: 1000 }}>
        {/* back */}
        <button onClick={onBack} className="group flex items-center gap-2 mb-10" style={{ color: 'var(--fg-dim)', ...reveal(0) }}>
          <__Icon name="chevronLeft" size={15} />
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Return to {cat.title}</span>
        </button>

        {/* header */}
        <div style={reveal(0.05)}>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: accent }}>{cat.index} / {cat.tagline}</span>
            <span style={{ height: 1, width: 40, background: 'var(--line-strong)' }} />
            {project.status && <span className="font-mono px-2 py-0.5" style={{ fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, border: `1px solid ${accent}55` }}>{project.status}</span>}
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 84px)', fontWeight: 700, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{project.title}</h1>
          <div className="font-mono mt-2" style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{project.tag}</div>
        </div>

        {/* hero */}
        {project.hero && (
          <div className="mt-9" style={reveal(0.1)}>
            <__PH label={project.hero.label} ratio="banner" accent={accent} />
          </div>
        )}

        {/* context callout (numerical worksheets) */}
        {project.context && (
          <div className="mt-9 relative px-5 py-4" style={{ background: 'rgba(241,235,221,0.025)', border: '1px solid var(--line)', ...reveal(0.12) }}>
            <div className="mono-label mb-1.5" style={{ color: accent }}>Context // Runic Rush</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-dim)' }}>{project.context}</p>
          </div>
        )}

        {/* body: narrative + sidebar */}
        <style>{`.proj-body{display:grid;gap:2.5rem;grid-template-columns:1fr}@media(min-width:768px){.proj-body{grid-template-columns:1fr 260px;gap:3.5rem}}`}</style>
        <div className="proj-body mt-10" style={reveal(0.16)}>
          {/* main column */}
          <div className="flex flex-col gap-10 min-w-0">
            {project.sections.map((sec, i) => (
              <section key={i} className="flex flex-col gap-4">
                <h3 className="font-display flex items-center gap-3" style={{ fontSize: 22, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.01em', color: accent }}>
                  <span style={{ width: 7, height: 7, background: accent, transform: 'rotate(45deg)' }} />
                  {sec.heading}
                </h3>
                {sec.blocks.map((b, j) => <Block key={j} block={b} accent={accent} />)}
              </section>
            ))}
          </div>

          {/* sidebar */}
          <aside className="flex flex-col gap-6">
            {project.meta && (
              <div className="relative" style={{ border: '1px solid var(--line)' }}>
                <__Corners color={accent} size={8} inset={-1} />
                <div className="px-4 py-2.5" style={{ borderBottom: '1px solid var(--line)' }}>
                  <span className="mono-label" style={{ color: accent }}>Dossier</span>
                </div>
                <div className="flex flex-col">
                  {project.meta.map((m, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: i < project.meta.length - 1 ? '1px solid var(--line)' : 'none' }}>
                      <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{m.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {project.links && project.links.map((l, i) => (
              <__Ghost key={i} as="a" href={l.url} accent={accent} className="justify-center" icon={<__Icon name="arrowOut" size={14} style={{ color: accent }} />}>{l.label}</__Ghost>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- CATEGORY (project index) ---------- */
function CategoryRow({ project, i, accent, ready, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(project)}
      className="group relative w-full flex items-center gap-5 md:gap-7 text-left py-5 md:py-6 cursor-pointer"
      style={{
        borderTop: i === 0 ? '1px solid var(--line)' : 'none',
        borderBottom: '1px solid var(--line)',
        paddingLeft: hover ? 16 : 4, paddingRight: 12,
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateX(0)' : 'translateX(24px)',
        transition: `padding .3s var(--ease), opacity .6s var(--ease) ${0.25 + i * 0.08}s, transform .6s var(--ease) ${0.25 + i * 0.08}s`,
      }}
    >
      {/* hover accent edge */}
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: accent, transform: `scaleY(${hover ? 1 : 0})`, transformOrigin: 'center', transition: 'transform .3s var(--ease)' }} />
      <span className="font-display shrink-0" style={{ fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 300, lineHeight: 1, color: hover ? accent : 'var(--fg-ghost)', width: 56, transition: 'color .25s' }}>{String(i + 1).padStart(2, '0')}</span>
      <div className="flex-1 min-w-0">
        <div className="font-display" style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 600, lineHeight: 1.02, textTransform: 'uppercase', letterSpacing: '0.005em', color: hover ? 'var(--fg)' : 'var(--fg-dim)', transition: 'color .25s' }}>{project.title}</div>
        <div className="font-mono mt-1.5 flex items-center gap-3" style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
          <span>{project.tag}</span>
          {project.status && <span style={{ color: hover ? accent : 'var(--fg-faint)', transition: 'color .25s' }}>• {project.status}</span>}
        </div>
      </div>
      <span className="shrink-0 grid place-items-center" style={{ width: 30, height: 30, border: `1px solid ${hover ? accent : 'var(--line-strong)'}`, transform: `rotate(45deg) translateX(${hover ? 0 : -2}px)`, transition: 'all .25s var(--ease)' }}>
        <span style={{ transform: 'rotate(-45deg)', color: hover ? accent : 'var(--fg-faint)', transition: 'color .25s' }}>
          <__Icon name="chevronRight" size={14} />
        </span>
      </span>
    </button>
  );
}

function CategoryView({ cat, onBack, onOpen }) {
  const accent = __accentOf(cat.accent);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setReady(true), 30); return () => clearTimeout(t); }, []);

  const reveal = (d = 0) => ({ opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(14px)', transition: `all .7s var(--ease) ${d}s` });

  return (
    <div className="absolute inset-0 z-20 overflow-y-auto scroll-thin">
      <div className="min-h-full grid items-center" style={{ gridTemplateColumns: '1fr', maxWidth: 1180, margin: '0 auto' }}>
        <style>{`.catgrid{display:grid;gap:2.5rem;grid-template-columns:1fr}@media(min-width:900px){.catgrid{grid-template-columns:minmax(280px,380px) 1fr;gap:4rem}}`}</style>
        <div className="catgrid px-6 md:px-12 py-24">
          {/* LEFT — title block */}
          <div className="flex flex-col min-w-0 overflow-hidden">
            <button onClick={onBack} className="group flex items-center gap-2 mb-9 w-fit" style={{ color: 'var(--fg-dim)', ...reveal(0) }}>
              <__Icon name="chevronLeft" size={15} />
              <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Return to System</span>
            </button>

            <div className="font-mono mb-3" style={{ fontSize: 12, letterSpacing: '0.26em', color: accent, ...reveal(0.05) }}>DISCIPLINE {cat.index}</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(34px,4.2vw,64px)', fontWeight: 700, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em', wordBreak: 'break-word', ...reveal(0.08) }}>{cat.title}</h1>
            <div className="font-mono mt-3" style={{ fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-dim)', ...reveal(0.12) }}>{cat.tagline}</div>

            <div className="mt-7 pt-7" style={{ borderTop: `1px solid var(--line)`, maxWidth: 360, ...reveal(0.16) }}>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-dim)' }}>{cat.summary}</p>
            </div>

            <div className="mt-7 font-mono flex items-center gap-2" style={{ fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-faint)', ...reveal(0.2) }}>
              <span style={{ width: 6, height: 6, background: accent, transform: 'rotate(45deg)' }} />
              {cat.projects.length} {cat.projects.length === 1 ? 'Entry' : 'Entries'} — select to open
            </div>
          </div>

          {/* RIGHT — project index */}
          <div className="flex flex-col self-center">
            {cat.projects.map((p, i) => (
              <CategoryRow key={p.id} project={p} i={i} accent={accent} ready={ready} onOpen={onOpen} />
            ))}
            {/* "more to come" ghost row */}
            <div className="flex items-center gap-5 md:gap-7 py-5 md:py-6" style={{ borderBottom: '1px solid var(--line)', opacity: ready ? 0.4 : 0, transition: `opacity .6s var(--ease) ${0.25 + cat.projects.length * 0.08}s` }}>
              <span className="font-display shrink-0" style={{ fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 300, color: 'var(--fg-ghost)', width: 56 }}>{String(cat.projects.length + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <div className="font-display" style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--fg-faint)' }}>More to come</div>
                <div className="font-mono mt-1.5" style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>Future updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CategoryView, ProjectView });
