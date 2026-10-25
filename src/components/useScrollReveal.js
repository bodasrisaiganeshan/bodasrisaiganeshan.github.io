import { useEffect } from 'react';

/**
 * Scroll reveal for every `[data-reveal]` element on the page.
 *
 * Marks an element `data-revealed` the first time enough of it is on screen
 * (or once it is already above the viewport, e.g. after a restored scroll),
 * then stops watching it. The motion itself is CSS (see "Scroll reveal" in
 * sections.css) and only applies when `html.can-reveal` is set and motion is
 * welcome, so content is never hidden without this hook running.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]:not([data-revealed])')];
    const show = (el) => el.setAttribute('data-revealed', '');

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach(show);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
