import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: 'localhost', // Gunakan 'localhost' untuk menghindari IPv6
    port: 5173,
    strictPort: true, // Pastikan port tetap
    hmr: {
      host: 'localhost',
    },
  },
});
