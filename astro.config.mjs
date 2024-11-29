import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'hybrid',
  site: 'https://example.com',
  integrations: [
    tailwind(),
    react(),
    mdx()
  ]
});