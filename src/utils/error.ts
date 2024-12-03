import type { Language } from '../i18n/ui';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function redirectToError(lang: Language): Response {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': `/${lang}/error`
    }
  });
}

export function handleApiError(error: unknown): Response {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({ error: error.message, code: error.code }),
      {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Internal Server Error' }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}