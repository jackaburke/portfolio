// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jackaburke.com',
  integrations: [
    icon(),
    // 404/500 aren't real content, so keep them out of the sitemap
    sitemap({
      filter: (page) => !/\/(404|500)\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Vite blocks unfamiliar Host headers; this is the name dev-mobile.sh uses.
      // `||`, not `??`: an empty var leaves ".local", a wildcard to Vite.
      allowedHosts: [`${process.env.DEV_MOBILE_NAME || 'portfolio'}.local`],
    },
  },
  build: {
    assets: 'static',
  },
  // A handful of static pages, cheap to prefetch every visible link
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
