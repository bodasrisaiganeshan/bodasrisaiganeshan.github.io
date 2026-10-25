import { useEffect, useId, useRef, useState } from 'react';
import { connect } from '../data/site.js';
import {
  AlertIcon,
  ArrowUpRightIcon,
  BrandIcon,
  CheckCircleIcon,
  LinkedInIcon,
  MailIcon,
  SendIcon,
} from './icons.jsx';

/*
  Delivery. The form posts JSON to Formspree, which forwards each submission to
  the email address that owns the Formspree form. Set VITE_FORMSPREE_FORM_ID
  (the 8-character ID from https://formspree.io/f/<id>) in .env.local or the
  host's build environment. The form ID is a public identifier, not a secret;
  there is no API key in this code.

  Without a form ID, submitting still validates, then says plainly that the
  message was not sent and offers an email draft instead. A success state is
  shown only after Formspree answers with a 2xx response.
*/
const FORM_ID = (import.meta.env.VITE_FORMSPREE_FORM_ID || '').trim();
const ENDPOINT = /^[A-Za-z0-9]{6,16}$/.test(FORM_ID) ? `https://formspree.io/f/${FORM_ID}` : '';
const TIMEOUT_MS = 15000;

const LIMITS = { name: 80, email: 254, message: 2000 };
const MIN_MESSAGE = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A mailto: draft carrying what the visitor already typed (form fallback only). */
function draftHref(values) {
  const subject = `Portfolio message from ${values.name.trim() || 'a visitor'}`;
  const body = `${values.message.trim()}\n\n${values.name.trim()}${
    values.email.trim() ? ` (${values.email.trim()})` : ''
  }`;
  return `mailto:${connect.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Enter your name.';
  else if (name.length < 2) errors.name = 'Your name needs at least 2 characters.';

  if (!email) errors.email = 'Enter your email so I can reply.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address like name@example.com.';

  if (!message) errors.message = 'Write a message.';
  else if (message.length < MIN_MESSAGE)
    errors.message = `Your message needs at least ${MIN_MESSAGE} characters.`;

  return errors;
}

const ORDER = ['name', 'email', 'message'];
const EMPTY = { name: '', email: '', message: '', _gotcha: '' };

function MethodIcon({ id }) {
  if (id === 'email') return <MailIcon />;
  if (id === 'linkedin') return <LinkedInIcon />;
  return <BrandIcon id="github" />;
}

/**
 * Let's Connect — contact cards, a working form, and a laptop that opens once
 * when the section first comes into view (the section's single authored
 * moment). With reduced motion the laptop is simply drawn open.
 */
export default function Connect() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  // idle | sending | sent | failed | unconfigured
  const [status, setStatus] = useState('idle');
  const [failure, setFailure] = useState('');
  const [open, setOpen] = useState(false);

  const fieldRefs = { name: useRef(null), email: useRef(null), message: useRef(null) };
  const statusRef = useRef(null);
  const artRef = useRef(null);
  const uid = useId();
  const ids = (f) => ({ input: `${uid}-${f}`, error: `${uid}-${f}-err` });

  // Open the lid once, the first time the artwork is substantially visible.
  useEffect(() => {
    const el = artRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setOpen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (status === 'sent' || status === 'failed' || status === 'unconfigured') {
      statusRef.current?.focus();
    }
  }, [status]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const first = ORDER.find((f) => found[f]);
    if (first) {
      fieldRefs[first].current?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: `Portfolio message from ${values.name.trim()}`,
          _gotcha: values._gotcha,
        }),
        signal: controller.signal,
      });
      if (res.ok) {
        setStatus('sent');
        setValues(EMPTY);
        setAttempted(false);
        setErrors({});
        return;
      }
      let detail = '';
      try {
        const data = await res.json();
        // Formspree field errors are fragments ("should be an email"); name the field.
        detail = Array.isArray(data?.errors)
          ? data.errors
              .map((x) => {
                const text = String(x.message || '').trim();
                if (!text) return '';
                const sentence = x.field ? `${x.field[0].toUpperCase()}${x.field.slice(1)} ${text}` : text;
                return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
              })
              .filter(Boolean)
              .join(' ')
          : '';
      } catch {
        /* Non-JSON error body: fall back to the status line. */
      }
      setFailure(detail || `The message service answered with an error (${res.status}).`);
      setStatus('failed');
    } catch (err) {
      setFailure(
        err?.name === 'AbortError'
          ? 'The message service took too long to answer.'
          : 'The message could not reach the service. Check your connection.',
      );
      setStatus('failed');
    } finally {
      clearTimeout(timer);
    }
  };

  const sending = status === 'sending';
  const count = values.message.length;

  const field = (name, label, props) => {
    const { input, error } = ids(name);
    const err = errors[name];
    const Tag = name === 'message' ? 'textarea' : 'input';
    return (
      <div className={`field field-${name}`} data-invalid={Boolean(err)}>
        <div className="field-head">
          <label htmlFor={input}>{label}</label>
          {name === 'message' ? (
            <span className="field-count" aria-hidden="true">
              {count}/{LIMITS.message}
            </span>
          ) : null}
        </div>
        <Tag
          ref={fieldRefs[name]}
          id={input}
          name={name}
          value={values[name]}
          onChange={onChange}
          maxLength={LIMITS[name]}
          readOnly={sending}
          aria-invalid={Boolean(err)}
          aria-describedby={err ? error : undefined}
          {...props}
        />
        {err ? (
          <p id={error} className="field-error">
            <AlertIcon />
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <section id="contact" className="connect" aria-labelledby="connect-title">
      <div className="connect-inner">
        <div className="connect-intro" data-reveal="stagger" data-motion="left">
          <h2 id="connect-title" className="connect-title">
            Let’s <span>Connect</span>
          </h2>
          <p className="connect-lede">{connect.intro}</p>

          <ul className="methods" data-reveal="stagger" data-motion="swing-left" style={{ '--rd': 180 }}>
            {connect.methods.map((m) => {
              const body = (
                <>
                  <span className={`method-mark method-mark-${m.id}`} aria-hidden="true">
                    <MethodIcon id={m.id} />
                  </span>
                  <span className="method-text">
                    <span className="method-label">{m.label}</span>
                    <span className="method-value">{m.value}</span>
                  </span>
                  <ArrowUpRightIcon className="icon method-arrow" />
                </>
              );
              return (
                <li key={m.id}>
                  <a
                    className="method"
                    href={m.href}
                    {...(m.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {body}
                    <span className="sr-only">
                      {m.newTabNote ??
                        (m.external ? `(opens ${m.label} in a new tab)` : '(opens a new email draft)')}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <form className="cform" data-reveal="up" data-motion="tilt" style={{ '--rd': 100 }} onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-form-title`}>
          <h3 id={`${uid}-form-title`} className="cform-title">
            <SendIcon />
            {connect.formTitle}
          </h3>

          <div className="cform-row">
            {field('name', 'Your name', { type: 'text', autoComplete: 'name', required: true })}
            {field('email', 'Your email', {
              type: 'email',
              autoComplete: 'email',
              inputMode: 'email',
              spellCheck: false,
              required: true,
            })}
          </div>
          {field('message', 'Your message', { rows: 6, required: true })}

          {/* Spam trap for the form service. Hidden from people and assistive tech. */}
          <div className="cform-trap" aria-hidden="true">
            <label>
              Leave this empty
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={values._gotcha}
                onChange={onChange}
              />
            </label>
          </div>

          <button type="submit" className="btn cform-send" disabled={sending} aria-busy={sending}>
            {sending ? <span className="spinner" aria-hidden="true" /> : <SendIcon />}
            <span>{sending ? 'Sending…' : 'Send message'}</span>
          </button>

          <div className="cform-status" aria-live="polite">
            {status === 'sent' ? (
              <div ref={statusRef} tabIndex={-1} className="notice notice-ok">
                <CheckCircleIcon />
                <p>Message sent. Thanks for writing — I’ll reply to the email you gave.</p>
              </div>
            ) : null}

            {status === 'failed' ? (
              <div ref={statusRef} tabIndex={-1} className="notice notice-err" role="alert">
                <AlertIcon />
                <div>
                  <p>
                    Your message was not sent. {failure} Your text is still in the form — try
                    again, or send it as an email instead.
                  </p>
                  <div className="notice-actions">
                    <a className="notice-btn" href={draftHref(values)}>
                      <MailIcon />
                      <span>Open email draft</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            {status === 'unconfigured' ? (
              <div ref={statusRef} tabIndex={-1} className="notice notice-warn" role="alert">
                <AlertIcon />
                <div>
                  <p>
                    Your message was not sent: this form isn’t connected to an inbox yet. Send it
                    as an email instead — your text is carried over.
                  </p>
                  <div className="notice-actions">
                    <a className="notice-btn" href={draftHref(values)}>
                      <MailIcon />
                      <span>Open email draft</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </form>

        <div className="connect-art">
          <figure
            ref={artRef}
            className="lap-scene"
            data-open={open}
            role="img"
            aria-label={`Illustration: an open laptop whose screen reads “${connect.artLine}”, with GitHub, LinkedIn and email icons floating around it.`}
          >
            <svg className="lap-orbits" viewBox="0 0 400 260" fill="none" aria-hidden="true">
              <ellipse cx="200" cy="150" rx="186" ry="66" />
              <ellipse cx="200" cy="150" rx="150" ry="96" transform="rotate(-14 200 150)" />
            </svg>

            <div className="lap" aria-hidden="true">
              <div className="lap-lid">
                <span className="lap-cam" />
                <div className="lap-screen">
                  <p className="lap-line">
                    Let’s Build
                    <br />
                    Something
                    <br />
                    <span>Great Together.</span>
                  </p>
                  <span className="lap-caret" />
                </div>
              </div>
              <div className="lap-base">
                <svg className="lap-keys" viewBox="0 0 260 84" preserveAspectRatio="none">
                  {Array.from({ length: 4 }, (_, r) =>
                    Array.from({ length: 13 }, (_, c) => (
                      <rect key={`${r}-${c}`} x={4 + c * 19.5} y={4 + r * 15} width="16" height="11.5" rx="2.4" />
                    )),
                  )}
                  <rect x="62" y="64" width="136" height="11.5" rx="2.4" />
                </svg>
                <span className="lap-pad" />
                <span className="lap-lip" />
              </div>
            </div>
            <span className="lap-floor" aria-hidden="true" />

            <span className="tile tile-github" aria-hidden="true">
              <BrandIcon id="github" />
            </span>
            <span className="tile tile-mail" aria-hidden="true">
              <MailIcon />
            </span>
            <span className="tile tile-linkedin" aria-hidden="true">
              <LinkedInIcon />
            </span>
          </figure>

          <dl className="connect-stats" data-reveal="stagger" data-motion="pop" style={{ '--rd': 200 }}>
            {connect.stats.map((s) => (
              <div key={s.id}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
