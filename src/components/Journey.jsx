import { useEffect, useRef, useState } from 'react';
import { journey } from '../data/site.js';
import { ArrowUpRightIcon } from './icons.jsx';

const REDUCE = '(prefers-reduced-motion: reduce)';

/**
 * Journey & Learning.
 *
 * An ordered timeline, oldest first. As each step scrolls into view the rail
 * fills down to it, its marker lights and pulses once, its date slides in
 * from the left and its card from the right. Without IntersectionObserver, or
 * under reduced motion, every step simply starts lit and in place.
 *
 * Projects have no confirmed dates, so they sit beside the timeline under
 * "Built alongside" rather than being placed on it.
 */
export default function Journey() {
  const listRef = useRef(null);
  const [reached, setReached] = useState(() => {
    const animate =
      typeof window !== 'undefined' &&
      typeof IntersectionObserver !== 'undefined' &&
      !window.matchMedia(REDUCE).matches;
    return animate ? -1 : journey.steps.length - 1;
  });

  useEffect(() => {
    if (reached === journey.steps.length - 1) return undefined;
    const items = [...listRef.current.querySelectorAll('.jstep')];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // A step already above the viewport (restored scroll, jump links)
          // counts as reached, so nothing is left waiting off screen.
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
          const i = items.indexOf(entry.target);
          setReached((r) => Math.max(r, i));
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -30% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // Runs once: `reached` only decides whether to observe at all.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const last = journey.steps.length - 1;
  const fill = reached < 0 ? 0 : reached / last;

  return (
    <section id="journey" className="journey" aria-labelledby="journey-title">
      <div className="journey-inner">
        <header className="journey-head" data-reveal="stagger" data-motion="split">
          <h2 id="journey-title" className="section-title">
            {journey.heading.lead} <span>{journey.heading.accent}</span>
          </h2>
          <p className="journey-intro">{journey.intro}</p>
        </header>

        <div className="journey-grid">
          <ol ref={listRef} className="jline" style={{ '--fill': fill }}>
            {journey.steps.map((s, i) => (
              <li
                key={s.id}
                className="jstep"
                data-reached={i <= reached}
                data-current={s.current || undefined}
              >
                <span className="jstep-marker" aria-hidden="true" />
                <div className="jstep-meta">
                  {s.dated ? (
                    <time className="jstep-when">{s.when}</time>
                  ) : (
                    <span className="jstep-when jstep-when-soft">{s.when}</span>
                  )}
                  <span className="jstep-kind">{s.kind}</span>
                </div>

                <div className="jstep-body">
                  <h3 className="jstep-title">{s.title}</h3>
                  <p className="jstep-place">{s.place}</p>
                  <p className="jstep-text">{s.text}</p>

                  {s.items ? (
                    <ul className="jstep-items">
                      {s.items.map((it) => (
                        <li key={it.id}>
                          <span className="jstep-item-title">{it.title}</span>
                          <span className="jstep-item-meta">
                            {it.issuer}
                            {it.date ? `, ${it.date}` : ''}
                          </span>
                          {it.link ? (
                            <a className="jstep-verify" href={it.link} target="_blank" rel="noreferrer">
                              Verify
                              <ArrowUpRightIcon />
                              <span className="sr-only">(opens {it.issuer} verification in a new tab)</span>
                            </a>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {s.also ? <p className="jstep-also">{s.also}</p> : null}
                </div>
              </li>
            ))}
          </ol>

          <aside className="jbuilt" data-reveal="stagger" data-motion="right" style={{ '--rd': 120 }} aria-labelledby="jbuilt-title">
            <h3 id="jbuilt-title" className="jbuilt-title">
              {journey.builtTitle}
            </h3>
            <p className="jbuilt-note">{journey.builtNote}</p>
            <ul className="jbuilt-list">
              {journey.built.map((p) => (
                <li key={p.id}>
                  <a href={p.href} target="_blank" rel="noreferrer">
                    <span className="jbuilt-name">
                      {p.name}
                      <ArrowUpRightIcon />
                    </span>
                    <span className="jbuilt-cat">{p.category}</span>
                    <span className="jbuilt-state" data-live={p.live}>
                      {p.live ? <span className="live-dot" aria-hidden="true" /> : null}
                      {p.state}
                    </span>
                    <span className="sr-only">{p.linkNote}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="jbuilt-next">
              <h4>{journey.exploringTitle}</h4>
              <p>{journey.exploring}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
