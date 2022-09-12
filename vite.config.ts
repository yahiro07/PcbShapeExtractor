import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: './dist/pcb-shape-extractor',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src/'),
    },
  },
  clearScreen: false,
});
