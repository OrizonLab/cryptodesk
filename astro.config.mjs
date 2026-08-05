// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cryptodesk.fr',
  compressHTML: true,
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Prioritize the homepage
        if (item.url === 'https://cryptodesk.fr/') {
          item.priority = 1.0;
        }
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
