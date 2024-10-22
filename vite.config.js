import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/index.ts', // Ensure this points to your main TypeScript file
    },
  },
});
