import { useCallback, useEffect, useRef, useState } from 'react';
import { certifications } from '../data/site.js';
import { ArrowUpRightIcon, ChevronIcon } from './icons.jsx';

const records = certifications.records;

const pad = (n) => String(n).padStart(3, '0');

/** Two-letter mark for the issuer chip, taken from the issuer's own name. */
function initials(issuer) {
  return issuer
    .split(/[\s·&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/**
 * Certifications — a horizontal shelf of the documents themselves.
 *
 * One card per certificate, newest first, each showing the real document. The
 * track is a native scroll container with scroll-snap, so touch, trackpad and
 * Shift+wheel all work as expected; the arrows step by one card and disable at
 * either end. Four cards fit on wide screens, fewer on narrower ones (CSS).
 * The filter only hides cards; a card keeps its number whichever filter is on.
 * A verification link appears only where the record carries one.
 */
export default function Certifications() {
  const [filter, setFilter] = useState('all');
  // Set once the visitor changes the filter, so the new set uses the quicker
  // swap entrance instead of the first shelf entrance.
  const [swapped, setSwapped] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const trackRef = useRef(null);

  const counts = Object.fromEntries(
    certifications.filters.map((f) => [
      f.id,
      f.id === 'all' ? records.length : records.filter((r) => r.category === f.id).length,
    ]),
  );
  const shown = records.filter((r) => filter === 'all' || r.category === filter);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    updateEdges();
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateEdges]);

  // A new filter starts the shelf from the beginning.
  useEffect(() => {
    const el = trackRef.current;
    el.scrollTo({ left: 0, behavior: 'instant' });
    updateEdges();
  }, [filter, updateEdges]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    const card = el.querySelector('.ccard');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  const scrollable = !(edges.start && edges.end);

  return (
    <section id="certifications" className="certs" aria-labelledby="certs-title">
      <div className="certs-inner">
        <header className="certs-head" data-reveal="stagger" data-motion="split">
          <div>
            <p className="certs-kicker">The learning archive</p>
            <h2 id="certs-title" className="section-title">
              Certifications <span>&amp; continued study</span>
            </h2>
          </div>
          <p className="certs-count" aria-hidden="true">
            <span>{pad(records.length)}</span> records
          </p>
        </header>

        <div className="certs-bar" data-reveal="stagger" data-motion="split" style={{ '--rd': 80 }}>
          <div className="certs-filters" role="group" aria-label="Filter certifications">
            {certifications.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => {
                  if (f.id === filter) return;
                  setFilter(f.id);
                  setSwapped(true);
                }}
              >
                {f.label}
                <span className="certs-filter-n">{counts[f.id]}</span>
              </button>
            ))}
          </div>

          <div className="certs-nav" data-hidden={!scrollable}>
            <button
              type="button"
              className="certs-arrow"
              onClick={() => scrollByCard(-1)}
              disabled={edges.start}
              aria-label="Scroll to previous certificates"
              aria-controls="certs-track"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              type="button"
              className="certs-arrow"
              onClick={() => scrollByCard(1)}
              disabled={edges.end}
              aria-label="Scroll to more certificates"
              aria-controls="certs-track"
            >
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>

        <ul
          id="certs-track"
          ref={trackRef}
          className="certs-track"
          data-reveal="stagger"
          data-swap={swapped || undefined}
          onScroll={updateEdges}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label={`Certificates, ${shown.length} items. Scroll horizontally to see more.`}
        >
          {shown.map((r, ci) => {
            const n = records.indexOf(r) + 1;
            return (
              // Keyed by filter too, so every card replays its entrance on a change.
              <li key={`${filter}-${r.id}`} className="ccard" style={{ '--ci': ci }}>
                <figure className="ccard-shot">
                  <img
                    src={r.preview.src}
                    width={r.preview.width}
                    height={r.preview.height}
                    alt={`${r.title} — ${r.type.split(' · ')[0].toLowerCase()} issued by ${r.issuer}`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </figure>

                <div className="ccard-body">
                  <div className="ccard-issuer">
                    <span className="ccard-mark" aria-hidden="true">
                      {initials(r.issuer)}
                    </span>
                    <span className="ccard-issuer-name">{r.issuer}</span>
                    <span className="ccard-num" aria-hidden="true">
                      {String(n).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="ccard-title">{r.title}</h3>
                  <p className="ccard-type">{r.type}</p>

                  <div className="ccard-foot">
                    <time className="ccard-date">{r.date}</time>
                    {r.link ? (
                      <a className="ccard-link" href={r.link} target="_blank" rel="noreferrer">
                        <span>Verify</span>
                        <ArrowUpRightIcon />
                        <span className="sr-only">(opens {r.issuer} verification in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="sr-only" aria-live="polite">
          {`Showing ${shown.length} of ${records.length} certifications`}
        </p>
      </div>
    </section>
  );
}
