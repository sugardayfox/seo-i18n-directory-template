import { defineMiddleware } from 'astro:middleware';
import { languages, defaultLang } from './i18n/ui';

export const onRequest = defineMiddleware(async ({ request, redirect }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Handle root path
  if (pathname === '/') {
    return redirect(`/${defaultLang}/`);
  }

  // Get the first segment of the path (potential language code)
  const [, lang] = pathname.split('/');

  // If no language is specified or the language is not supported
  if (!lang || !(lang in languages)) {
    // Get the rest of the path without the first slash
    const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    return redirect(`/${defaultLang}/${path}`);
  }

  // Continue with the request if the language is valid
  return next();
});