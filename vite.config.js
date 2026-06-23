import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist', 
    emptyOutDir: true // This tells Vite it is safe to clear the old files
  }
});