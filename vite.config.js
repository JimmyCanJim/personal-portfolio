import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist', 
    emptyOutDir: true,
    rollupOptions: {input:{main: 'public/index.html', about: 'public/about.html', projects: 'public/projects.html'}}
  }
});