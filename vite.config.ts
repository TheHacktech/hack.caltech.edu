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
