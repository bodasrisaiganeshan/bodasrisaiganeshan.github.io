import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { projects } from '../data/site.js';
import { ArrowUpRightIcon, BrandIcon, ChevronIcon, PauseIcon, PlayIcon } from './icons.jsx';

const items = projects.items;
const count = items.length;

/** Time each project stays in focus during automatic rotation. */
const INTERVAL = 6500;

/** Signed distance from the active slide, wrapped so neighbours sit at ±1. */
function offsetOf(i, active) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

const REDUCE = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (cb) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getReducedMotion = () => window.matchMedia(REDUCE).matches;

const subscribeVisibility = (cb) => {
  document.addEventListener('visibilitychange', cb);
  return () => document.removeEventListener('visibilitychange', cb);
};
const getPageVisible = () => document.visibilityState === 'visible';

/**
 * Projects — stacked 3D carousel with automatic rotation.
 *
 * All cards share one grid cell, so the stage is always as tall as the
 * tallest card. `data-pos` (-1, 0, 1) places a card; depth, lighting and the
 * tablet/mobile adaptations are CSS. Inactive cards are `inert`, so their
 * links never take focus or clicks.
 *
 * Rotation: one timer, restarted whenever the active project changes, so a
 * manual step and an automatic step can never both fire. The timer keeps its
 * remaining time across pauses, and the indicator's progress bar is a CSS
 * animation paused by the same flag, so the two stay in step. Rotation pauses
 * on mouse hover, on keyboard focus inside the carousel, during a touch, when
 * the carousel is off screen or the tab is hidden, and when the visitor uses
 * the pause button. It is off entirely under prefers-reduced-motion.
 */
export default function Projects() {
  // `seq` counts changes; its parity alternates the wrap animation's name so it
  // replays even when the same card wraps twice in a row.
  const [{ active, prev, seq }, setSlide] = useState({ active: 0, prev: 0, seq: 0 });
  const [announce, setAnnounce] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion);
  const pageVisible = useSyncExternalStore(subscribeVisibility, getPageVisible);

  const rootRef = useRef(null);
  const swipe = useRef(null);
  const remaining = useRef(INTERVAL);
  const startedAt = useRef(0);

  const running =
    !reducedMotion && !userPaused && !hovered && !keyboardFocus && !touching && inView && pageVisible;

  const step = useCallback((dir, manual) => {
    setSlide((s) => ({ active: (s.active + dir + count) % count, prev: s.active, seq: s.seq + 1 }));
    setAnnounce(manual);
  }, []);

  const show = (i) => {
    setSlide((s) => (s.active === i ? s : { active: i, prev: s.active, seq: s.seq + 1 }));
    setAnnounce(true);
  };

  // Direction of the last change, so the incoming screenshot settles from
  // the side it travelled from.
  const dir = offsetOf(prev, active) > 0 ? 'prev' : 'next';

  // A new project in focus always gets the full interval.
  useEffect(() => {
    remaining.current = INTERVAL;
  }, [active]);

  useEffect(() => {
    if (!running) return undefined;
    startedAt.current = performance.now();
    const id = window.setTimeout(() => step(1, false), remaining.current);
    return () => {
      window.clearTimeout(id);
      remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt.current));
    };
  }, [running, active, step]);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1, true);
    }
  };

  // Only keyboard focus pauses rotation: a mouse or touch press on an arrow
  // also focuses it, and rotation should carry on after that.
  const onFocus = (e) => {
    if (e.target.matches(':focus-visible')) setKeyboardFocus(true);
  };
  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setKeyboardFocus(false);
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' || !e.isPrimary) return;
    setTouching(true);
    swipe.current = { x: e.clientX, y: e.clientY, t: performance.now() };
  };
  const onPointerUp = (e) => {
    setTouching(false);
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    const velocity = Math.abs(dx) / (performance.now() - s.t);
    if (Math.abs(dx) < Math.abs(dy)) return;
    if (Math.abs(dx) > 48 || (Math.abs(dx) > 16 && velocity > 0.45)) step(dx < 0 ? 1 : -1, true);
  };
  const onPointerCancel = () => {
    setTouching(false);
    swipe.current = null;
  };

  const current = items[active];

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects-inner">
        <header className="projects-head" data-reveal="stagger" data-motion="split">
          <h2 id="projects-title" className="section-title">
            {projects.heading.lead} <span>{projects.heading.accent}</span>
          </h2>
          <p className="projects-intro">
            One live platform and two prototypes. Use the arrows, or swipe on touch screens.
          </p>
        </header>

        <div
          ref={rootRef}
          className="carousel"
          data-reveal="up"
          data-motion="tilt"
          style={{ '--rd': 120 }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
        >
          <div
            className="carousel-stage"
            data-moved={seq > 0 || undefined}
            data-dir={dir}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            {items.map((p, i) => {
              const pos = offsetOf(i, active);
              const isActive = pos === 0;
              // The card travelling from one side to the other passes behind
              // the stack; it is lowered and briefly faded so it never shows.
              const wraps = Math.abs(pos - offsetOf(i, prev)) > 1;
              return (
                <article
                  key={p.id}
                  className="pcard"
                  data-pos={pos}
                  data-wrap={wraps ? (seq % 2 ? 'a' : 'b') : undefined}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}: ${p.name}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <div className="pcard-body">
                    <div className="pcard-head">
                      <span className="pcard-index" aria-hidden="true">
                        {p.index}
                      </span>
                      <div>
                        <h3 className="pcard-title">{p.name}</h3>
                        <p className="pcard-category" data-live={p.link.kind === 'site'}>
                          {p.link.kind === 'site' ? <span className="live-dot" aria-hidden="true" /> : null}
                          {p.category}
                        </p>
                      </div>
                    </div>

                    <p className="pcard-summary">{p.summary}</p>

                    <ul className="pcard-tags" aria-label="Technologies">
                      {p.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    <div className="pcard-actions">
                      {p.link.kind === 'site' ? (
                        <a className="btn btn-primary" href={p.link.href} target="_blank" rel="noreferrer">
                          <span>View live</span>
                          <ArrowUpRightIcon />
                          <span className="sr-only">(opens {p.link.label} in a new tab)</span>
                        </a>
                      ) : (
                        <a className="btn btn-primary" href={p.link.href} target="_blank" rel="noreferrer">
                          <BrandIcon id="github" />
                          <span>View on GitHub</span>
                          <span className="sr-only">(opens the {p.name} repository in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <figure className="pcard-shot">
                    <div className="pcard-bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      {p.link.kind === 'site' ? <span>{p.link.label}</span> : null}
                    </div>
                    <img
                      src={p.preview.src}
                      width={p.preview.width}
                      height={p.preview.height}
                      alt={p.preview.alt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  </figure>

                  {/* What a card shows while it waits at the side on desktop:
                      the same screenshot filling the card face, so the part
                      left visible beside the active card is recognisable. */}
                  <div className="pcard-ghost" aria-hidden="true">
                    <img src={p.preview.src} alt="" width={p.preview.width} height={p.preview.height} loading="lazy" decoding="async" draggable="false" />
                    <span className="pcard-index">{p.index}</span>
                  </div>
                </article>
              );
            })}

            <button type="button" className="carousel-arrow" data-dir="prev" onClick={() => step(-1, true)} aria-label="Previous project">
              <ChevronIcon dir="left" />
            </button>
            <button type="button" className="carousel-arrow" data-dir="next" onClick={() => step(1, true)} aria-label="Next project">
              <ChevronIcon dir="right" />
            </button>
          </div>

          <div className="carousel-foot">
            <button type="button" className="carousel-arrow carousel-arrow-inline" onClick={() => step(-1, true)} aria-label="Previous project">
              <ChevronIcon dir="left" />
            </button>

            <ol className="carousel-dots">
              {items.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    aria-current={i === active ? 'true' : undefined}
                    aria-label={`Show project ${i + 1}: ${p.name}`}
                    onClick={() => show(i)}
                  >
                    <span className="dot-num">{p.index}</span>
                    <span className="dot-bar" aria-hidden="true">
                      {i === active ? (
                        <span
                          className="dot-fill"
                          data-mode={reducedMotion ? 'static' : 'auto'}
                          data-running={running}
                          style={{ animationDuration: `${INTERVAL}ms` }}
                        />
                      ) : null}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            {reducedMotion ? null : (
              <button
                type="button"
                className="carousel-toggle"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? 'Start automatic rotation' : 'Pause automatic rotation'}
              >
                {userPaused ? <PlayIcon /> : <PauseIcon />}
              </button>
            )}

            <button type="button" className="carousel-arrow carousel-arrow-inline" onClick={() => step(1, true)} aria-label="Next project">
              <ChevronIcon dir="right" />
            </button>
          </div>

          {/* Announces manual changes only; automatic steps stay silent. */}
          <p className="sr-only" aria-live={announce ? 'polite' : 'off'}>
            {`Project ${active + 1} of ${count}: ${current.name}`}
          </p>
        </div>
      </div>
    </section>
  );
}
