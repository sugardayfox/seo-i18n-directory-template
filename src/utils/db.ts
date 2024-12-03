import { supabase } from './supabase';
import { AppError } from './error';
import { initializeDatabase } from './db-init';
import type { DirectoryItem, BlogPost } from './supabase';
import type { Language } from '../i18n/ui';

let isInitialized = false;

async function ensureInitialized() {
  if (!isInitialized) {
    try {
      await initializeDatabase();
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
}

export async function getDirectoryItems(lang: Language) {
  try {
    await ensureInitialized();

    const { data, error } = await supabase
      .from('directory_items')
      .select('*')
      .eq('lang', lang)
      .order('created_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'DB_ERROR', 500);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching directory items:', error);
    throw error;
  }
}

export async function getBlogPosts(lang: Language) {
  try {
    await ensureInitialized();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('lang', lang)
      .order('published_date', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'DB_ERROR', 500);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getDirectoryItem(id: string) {
  try {
    await ensureInitialized();

    const { data, error } = await supabase
      .from('directory_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(error.message, 'DB_ERROR', 500);
    }

    return data;
  } catch (error) {
    console.error('Error fetching directory item:', error);
    throw error;
  }
}

export async function getBlogPost(id: string) {
  try {
    await ensureInitialized();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(error.message, 'DB_ERROR', 500);
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}