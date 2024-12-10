import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/car-assistant/',
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@styles/mixins.scss' as mixins;
        `,
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
