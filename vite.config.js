import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Fills %SITE_URL% in index.html (canonical + Open Graph URLs) from the
 * SITE_URL environment variable, e.g. `SITE_URL=https://example.com npm run build`
 * or a SITE_URL line in .env.production. Social crawlers need absolute URLs,
 * so a build without it falls back to root-relative paths and warns.
 */
function siteUrl(mode) {
  const env = loadEnv(mode, process.cwd(), '');
  const url = (env.SITE_URL || '').replace(/\/+$/, '');
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      if (!url && mode === 'production') {
        this.warn('SITE_URL is not set: Open Graph URLs will be relative and link previews will not show the image.');
      }
      return html.replaceAll('%SITE_URL%', url);
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrl(mode)],
  server: { port: 5178 },
}));
