import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '/src/styles/global.css': '/src/styles/global.css', // Explicitly map the path
    },
  },
});
