import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif)$/i,
      exclude: ['sprite.svg'],
      include: undefined,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      png: {
        quality: 75,
      },
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      gif: {},
      cache: false,
      cacheLocation: undefined,
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
  },
});
