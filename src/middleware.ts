import { defineMiddleware } from 'astro:middleware';
import { defaultLang, ui } from './i18n/ui';

export const onRequest = defineMiddleware(async ({ request, redirect, url }, next) => {
  // Get the pathname from the URL
  const pathname = url.pathname;

  // Handle root path
  if (pathname === '/') {
    return redirect(`/${defaultLang}/`);
  }

  // Get the first segment of the path (potential language code)
  const [, lang] = pathname.split('/');

  // If no language is specified or the language is not supported
  if (!lang || !(lang in ui)) {
    // Get the rest of the path without the first slash
    const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    return redirect(`/${defaultLang}/${path}`);
  }

  // Continue with the request if the language is valid
  return next();
});