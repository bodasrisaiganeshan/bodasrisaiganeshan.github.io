import { useEffect, useId, useRef, useState } from 'react';
import { home } from '../data/site.js';
import { ChatIcon, MenuIcon } from './icons.jsx';

const ids = home.nav.map((l) => l.href.slice(1));

/**
 * The section whose top has passed a line just under the nav. Bottom of the
 * page always means the last section, which can be too short to reach it.
 */
function currentSection() {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    return ids[ids.length - 1];
  }
  const line = window.innerHeight * 0.35;
  let current = ids[0];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

/**
 * Top navigation. Desktop shows the full link row; below 960px the links move
 * into a disclosure panel behind the menu button. Section anchors are plain
 * hash links; the link for the section in view is marked as current.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(ids[0]);
  const panelId = useId();
  const buttonRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      setActive(currentSection());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="nav-inner">
        <a className="wordmark" href="#home" aria-label={`${home.wordmark}, home`}>
          {home.wordmark}
          <span className="wordmark-dot" aria-hidden="true" />
        </a>

        <nav className="nav-links" aria-label="Primary">
          <ul>
            {home.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} aria-current={link.href === `#${active}` ? 'location' : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a className="btn btn-outline btn-sm" href={home.talkCta.href} target="_blank" rel="noreferrer">
            <ChatIcon />
            <span>{home.talkCta.label}</span>
            <span className="sr-only">(opens LinkedIn in a new tab)</span>
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div id={panelId} className="nav-panel" hidden={!open}>
        <ul>
          {home.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={link.href === `#${active}` ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
