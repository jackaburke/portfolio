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
  },
  build: {
    assets: 'static',
  },
});
