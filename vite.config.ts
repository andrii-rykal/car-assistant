import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import mkcert from 'vite-plugin-mkcert';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/car-assistant/',
  plugins: [react()], // , mkcert()
  // server: {
  //   port: 3000,
  //   https: true
  // },
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
