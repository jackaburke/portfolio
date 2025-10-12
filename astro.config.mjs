// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        // Fixing issue with dart-sass deprecation warnings
        // [https://github.com/twbs/bootstrap/issues/40962#issuecomment-2448214806]
        scss: {
          silenceDeprecations: ['color-functions', 'global-builtin', 'import']
        }
      }
    }
  },
  site: 'https://jackaburke.com',
})