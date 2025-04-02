import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [svgr(), imagetools()],
  assetsInclude: ['**/*.svg', '**/*.png'],
  base: '/duck-shop/',
});
