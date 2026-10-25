import { useEffect, useRef, useState } from 'react';
import { aboutMe } from '../data/site.js';
import { ArrowRightIcon, BrandIcon } from './icons.jsx';

const REDUCE = '(prefers-reduced-motion: reduce)';

/**
 * About Me.
 *
 * Three bands, read in order. The introduction spans the width: heading on the
 * left, the two paragraphs on the right. The development process is the
 * centrepiece: four cards on one shared perspective, fanned gently around a
 * shallow arc, each lifted off a darker plate, joined in order by a rail and
 * closed by a return arc from Test & Improve back to Explore. Below, What Drives Me sits beside the grouped
 * tools and the closing mindset.
 *
 * The section's one authored moment is the cycle assembling: the cards rise
 * into place in order, the rail fills and the return arc traces itself when
 * the process scrolls into view. Without IntersectionObserver, or under
 * reduced motion, it simply starts assembled.
 */
export default function About() {
  const { badge, heading, paragraphs, process, drives, tools, mindset } = aboutMe;
  const processRef = useRef(null);
  const [drawn, setDrawn] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia(REDUCE).matches,
  );

  useEffect(() => {
    if (drawn) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDrawn(true);
        io.disconnect();
      },
      { rootMargin: '0px 0px -25% 0px' },
    );
    io.observe(processRef.current);
    return () => io.disconnect();
  }, [drawn]);

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about-inner">
        <header className="about-intro" data-reveal="stagger" data-motion="split">
          <div className="about-intro-head">
            <p className="about-badge">
              <UserIcon />
              {badge}
            </p>
            <h2 id="about-title" className="about-title">
              {heading.lead}
              <br />
              <span className="about-title-learn">{heading.accent[0]}</span>{' '}
              <span className="about-title-build">{heading.accent[1]}</span> {heading.tail}
            </h2>
          </div>
          <div className="about-intro-copy">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="about-text">
                {p}
              </p>
            ))}
          </div>
        </header>

        <section
          ref={processRef}
          className="about-panel about-process"
          data-drawn={drawn}
          aria-labelledby="about-process-title"
        >
          <div className="about-panel-head">
            <h3 id="about-process-title">
              <GearIcon />
              {process.title}
            </h3>
            <p>{process.note}</p>
          </div>

          <div className="cycle-stage">
            <ol className="cycle">
              {process.steps.map((s, i) => (
                <li key={s.id} className="cycle-step" data-step={s.id} style={{ '--i': i }}>
                  <span className="cycle-plate" aria-hidden="true" />
                  <div className="cycle-card">
                    <div className="cycle-card-top">
                      <span className="cycle-num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="cycle-icon" aria-hidden="true">
                        {STEP_ICONS[s.id]}
                      </span>
                    </div>
                    <h4>{s.name}</h4>
                    <p>{s.text}</p>
                  </div>
                  <span
                    className="cycle-link"
                    data-return={i === process.steps.length - 1 || undefined}
                    aria-hidden="true"
                  >
                    <ChevronIcon />
                  </span>
                </li>
              ))}
            </ol>

            <div className="cycle-return">
              <svg
                className="cycle-arc-svg"
                viewBox="0 0 1000 64"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cycle-arc" x1="1" x2="0" y1="0" y2="0">
                    <stop offset="0" stopColor="var(--a-magenta)" />
                    <stop offset="0.4" stopColor="var(--a-cyan)" />
                    <stop offset="0.7" stopColor="var(--a-blue)" />
                    <stop offset="1" stopColor="var(--a-violet)" />
                  </linearGradient>
                </defs>
                <path
                  className="cycle-arc"
                  pathLength="1"
                  d="M1000 0 V 18 C 1000 46, 975 62, 935 62 L 65 62 C 25 62, 0 46, 0 18 V 0"
                />
              </svg>
              <span className="cycle-arc-start" aria-hidden="true" />
              <span className="cycle-arc-head" aria-hidden="true">
                <ChevronIcon />
              </span>
              <p className="cycle-label">
                <LoopIcon />
                {process.cycleLabel}
                <span className="sr-only">: after Test &amp; Improve, the process starts again at Explore.</span>
              </p>
            </div>
          </div>
        </section>

        <div className="about-bottom">
          <section className="about-panel about-drives" data-reveal="up" data-motion="left" aria-labelledby="about-drives-title">
            <div className="about-panel-head">
              <h3 id="about-drives-title">
                <HeartIcon />
                {drives.title}
              </h3>
            </div>
            <ul className="drives" data-reveal="stagger" data-motion="pop" style={{ '--rd': 140 }}>
              {drives.items.map((d) => (
                <li key={d.id} className="drive" data-drive={d.id}>
                  <div className="drive-head">
                    <span className="drive-icon" aria-hidden="true">
                      {DRIVE_ICONS[d.id]}
                    </span>
                    <h4>{d.name}</h4>
                  </div>
                  <p>{d.text}</p>
                  {d.link ? (
                    <a className="drive-link" href={d.link.href} aria-label={d.link.label}>
                      <ArrowRightIcon />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <div className="about-side">
            <section className="about-panel about-tools" data-reveal="up" data-motion="right" style={{ '--rd': 80 }} aria-labelledby="about-tools-title">
              <div className="about-panel-head">
                <h3 id="about-tools-title">
                  <BoltIcon />
                  {tools.title}
                </h3>
              </div>
              <dl className="tool-groups">
                {tools.groups.map((g) => (
                  <div key={g.id} className="tool-group">
                    <dt>{g.label}</dt>
                    <dd>
                      <ul className="tools">
                        {g.items.map((t) => (
                          <li key={t.id} className="tool" data-tool={t.id}>
                            <BrandIcon id={t.id} className="tool-icon" />
                            {t.label}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <figure className="about-panel about-mindset" data-reveal="up" data-motion="tilt" style={{ '--rd': 160 }} aria-labelledby="about-mindset-title">
              <div className="about-panel-head">
                <h3 id="about-mindset-title">
                  <TargetIcon />
                  {mindset.title}
                </h3>
              </div>
              <div className="mindset-body">
                <blockquote className="mindset-quote">
                  {mindset.quote.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </blockquote>
                <svg className="mindset-climb" viewBox="0 0 160 110" aria-hidden="true">
                  <path className="mindset-ridge-back" d="M20 110 L74 62 L98 80 L160 34 V110 Z" />
                  <path className="mindset-ridge" d="M0 110 L58 56 L82 74 L118 30 L160 72 V110 Z" />
                  <path className="mindset-trail" d="M64 108 C 92 98, 76 86, 98 74 S 112 52, 118 36" />
                  <path className="mindset-pole" d="M118 34 V12" />
                  <path className="mindset-flag" d="M118 12 L134 17 L118 22 Z" />
                </svg>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Section icons: stroke-only, 1.5px, currentColor, matching icons.jsx. */

function Stroke({ children, className = 'icon' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function UserIcon() {
  return (
    <Stroke>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </Stroke>
  );
}

function GearIcon() {
  return (
    <Stroke>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
    </Stroke>
  );
}

function HeartIcon() {
  return (
    <Stroke>
      <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z" />
    </Stroke>
  );
}

function BoltIcon() {
  return (
    <Stroke>
      <path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z" />
    </Stroke>
  );
}

function TargetIcon() {
  return (
    <Stroke>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </Stroke>
  );
}

function ChevronIcon() {
  return (
    <Stroke>
      <path d="M9.5 6.5L15 12l-5.5 5.5" />
    </Stroke>
  );
}

function LoopIcon() {
  return (
    <Stroke>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L19.5 9M19.5 4.5V9H15M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4.5 15M4.5 19.5V15H9" />
    </Stroke>
  );
}

const SearchIcon = (
  <Stroke>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15 15l5 5" />
  </Stroke>
);

const BulbIcon = (
  <Stroke>
    <path d="M9 17h6M10 20.5h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V17h5.2v-1.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
  </Stroke>
);

const CodeIcon = (
  <Stroke>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
  </Stroke>
);

const RocketIcon = (
  <Stroke>
    <path d="M14 4.5c2.8-1 5-1 5.5-.5s.5 2.7-.5 5.5l-5.5 5.5-4-4zM9.5 11L6 10.5 3.5 13l4 1M13 14.5l.5 3.5-2.5 2.5-1-4M6.5 17.5l-2 2" />
    <circle cx="15" cy="9" r="1.2" />
  </Stroke>
);

const CubeIcon = (
  <Stroke>
    <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2zM4 7.2l8 4.4 8-4.4M12 11.6v9.6" />
  </Stroke>
);

const StepsIcon = (
  <Stroke>
    <path d="M5 19.5v-5M10 19.5v-8M15 19.5V8M20 19.5V4.5" />
  </Stroke>
);

const STEP_ICONS = {
  explore: SearchIcon,
  plan: BulbIcon,
  build: CodeIcon,
  improve: RocketIcon,
};

const DRIVE_ICONS = {
  curiosity: BulbIcon,
  problems: CodeIcon,
  projects: CubeIcon,
  learning: StepsIcon,
};
