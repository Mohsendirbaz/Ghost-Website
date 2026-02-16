import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The admin tool reads the main project's public/data/facts.bundle.json
// by proxying /data/ to the main project's public dir in dev mode.
export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 3100,
    // Proxy /data/ requests to the main project's public folder
    proxy: {
      '/data': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
