import type { APIRoute } from 'astro';
import { getDirectoryItems } from '../../../utils/db';
import { handleApiError, AppError } from '../../../utils/error';
import type { Language } from '../../../i18n/ui';

export const GET: APIRoute = async ({ url }) => {
  try {
    const lang = url.searchParams.get('lang') as Language;
    
    if (!lang) {
      throw new AppError('Language parameter is required', 'LANG_REQUIRED', 400);
    }

    const items = await getDirectoryItems(lang);

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
};