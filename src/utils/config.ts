import { AppError } from './error';
import type { Language } from '../i18n/ui';

interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  defaultLanguage: Language;
  environment: 'development' | 'production';
}

function validateConfig(): EnvConfig {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  const environment = import.meta.env.MODE as 'development' | 'production';

  if (!supabaseUrl) {
    throw new AppError(
      'Missing PUBLIC_SUPABASE_URL environment variable',
      'CONFIG_ERROR',
      500
    );
  }

  if (!supabaseAnonKey) {
    throw new AppError(
      'Missing PUBLIC_SUPABASE_ANON_KEY environment variable',
      'CONFIG_ERROR',
      500
    );
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    defaultLanguage: 'en',
    environment
  };
}

export const config = validateConfig();

export function isDevelopment(): boolean {
  return config.environment === 'development';
}

export function isProduction(): boolean {
  return config.environment === 'production';
}