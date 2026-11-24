import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { Connect, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const cleanPageUrls: Connect.NextHandleFunction = (request, _response, next) => {
  if (request.url) {
    request.url = request.url.replace(/^\/(live|organizer-interest)\/?(?=\?|$)/, '/$1.html');
  }
  next();
};

function localPageRoutes(): Plugin {
  return {
    name: 'hacktech-clean-page-urls',
    // Static hosts serve directory indexes for clean URLs. Keep the original
    // .html entry points too, since existing links still use them.
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        for (const route of ['live', 'organizer-interest']) {
          const entry = bundle[route + '.html'];
          if (entry?.type !== 'asset' || typeof entry.source !== 'string') {
            this.error('Missing HTML entry for ' + route);
          }
          this.emitFile({
            type: 'asset',
            fileName: route + '/index.html',
            source: entry.source.replace(/\b(src|href)="\.\//g, '$1="../'),
          });
        }
      },
    },
    configureServer(server) {
      server.middlewares.use(cleanPageUrls);
    },
    configurePreviewServer(server) {
      server.middlewares.use(cleanPageUrls);
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  base: './',
  plugins: [react(), localPageRoutes()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        live: resolve(import.meta.dirname, 'live.html'),
        organizer: resolve(import.meta.dirname, 'organizer-interest.html'),
      },
    },
  },
});
