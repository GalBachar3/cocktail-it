import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@mui/icons-material/Home'],
    },
    outDir: 'dist',
  },
  plugins: [react()],
  loader: { '.js': 'jsx' },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': "https://node17.cs.colman.ac.il",
      '/auth': "https://node17.cs.colman.ac.il",
    },
  },
});