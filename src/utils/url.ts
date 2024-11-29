import type { AstroGlobal } from 'astro';

export function getCanonicalURL(Astro: AstroGlobal): string {
  const site = Astro.site || new URL('https://example.com');
  return new URL(Astro.url.pathname, site).toString();
}

export function getImageURL(imagePath: string, site: URL | string | undefined): string {
  const baseURL = site || 'https://example.com';
  return new URL(imagePath, baseURL).toString();
}