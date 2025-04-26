import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      includePublic: true,
      png: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
  },
});
