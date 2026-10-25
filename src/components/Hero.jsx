import { heroIndex, home, profile, socials } from '../data/site.js';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BrandIcon,
  ChatIcon,
  LinkedInIcon,
} from './icons.jsx';

const github = socials.find((s) => s.id === 'github');
const linkedin = socials.find((s) => s.id === 'linkedin');

/**
 * Home / Hero.
 *
 * One orchestrated entrance (CSS, see "Entrance" in index.css): the name
 * wipes up line by line, the copy and facts follow in a stagger, the stage
 * word slides in behind the portrait, the portrait resolves, the arc draws
 * itself, and the cards swing in from opposite sides before the technology
 * strip lands. Nothing loops afterwards. All content is visible with the
 * animation removed (reduced motion, or no CSS animation support).
 */
export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-name">
      <div className="hero-glow" aria-hidden="true" />

      <aside className="rail" aria-label="Profiles">
        <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)">
          <BrandIcon id="github" />
        </a>
        <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)">
          <LinkedInIcon />
        </a>
        <span className="rail-line" aria-hidden="true" />
      </aside>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="greeting reveal" style={{ '--d': 0 }}>
            <span className="greeting-dot" aria-hidden="true" />
            {home.greeting}
          </p>

          <h1 id="hero-name" className="name">
            <span className="name-line reveal" style={{ '--d': 1 }}>
              {profile.firstLine}
            </span>
            <span className="name-line name-accent reveal" style={{ '--d': 2 }}>
              {profile.secondLine}
              <span className="name-stop" aria-hidden="true">.</span>
            </span>
          </h1>

          <p className="role reveal" style={{ '--d': 3 }}>
            {home.role}
          </p>

          <p className="lede reveal" style={{ '--d': 4 }}>
            {profile.description}
          </p>

          <div className="cta-row reveal" style={{ '--d': 5 }}>
            <a className="btn btn-primary" href={home.primaryCta.href}>
              <span>{home.primaryCta.label}</span>
              <ArrowRightIcon />
            </a>
            <a className="btn btn-outline" href={home.secondaryCta.href}>
              <ChatIcon />
              <span>{home.secondaryCta.label}</span>
            </a>
          </div>

          <dl className="facts reveal" style={{ '--d': 6 }}>
            {home.facts.map((f, i) => (
              <div className="fact" key={f.id} style={{ '--fi': i }}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="stage">
          <p className="stage-caption reveal" style={{ '--d': 2 }} aria-hidden="true">
            {home.stageCaption.join('  /  ')}
          </p>

          <div className="stage-word" aria-hidden="true">
            <span className="stage-word-fill">{home.stageWord}</span>
            <span className="stage-word-line">{home.stageWord}</span>
          </div>

          <svg className="stage-arc" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <linearGradient id="arc-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7c5cff" stopOpacity="0" />
                <stop offset="0.45" stopColor="#8b6cff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#4f8dff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="280" pathLength="1" fill="none" stroke="url(#arc-stroke)" strokeWidth="1.25" />
          </svg>

          <div className="portrait">
            <picture className="portrait-edge">
              <source media="(max-width: 640px)" srcSet="/portrait-sm.webp" type="image/webp" />
              <img
                src="/portrait.webp"
                width="1056"
                height="952"
                alt={home.portraitAlt}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          <a className="panel panel-live" href={home.live.href} target="_blank" rel="noreferrer">
            <span className="panel-kicker">
              <span className="live-dot" aria-hidden="true" />
              {home.live.label}
            </span>
            <span className="panel-title">
              {home.live.name}
              <ArrowUpRightIcon />
            </span>
            <span className="panel-note">{home.live.note}</span>
            <span className="sr-only">(opens samastam.xyz in a new tab)</span>
          </a>

          <div className="panel panel-focus">
            <p className="panel-heading">{home.focusTitle}</p>
            <ul>
              {heroIndex.focus.map((f) => (
                <li key={f.id} data-primary={f.primary}>
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="tech">
        <p className="tech-label">{home.techLabel}</p>
        <ul className="tech-list">
          {home.tech.map((t, i) => (
            <li key={t.id} style={{ '--i': i }}>
              <BrandIcon id={t.id} className="tech-icon" />
              <span className="tech-name">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
