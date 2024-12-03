import { createClient } from '@supabase/supabase-js';
import { AppError } from './error';
import { config } from './config';

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

export interface DirectoryItem {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  lang: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  published_date: string;
  lang: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export async function getDirectoryItems(lang: string) {
  try {
    const { data, error } = await supabase
      .from('directory_items')
      .select('*')
      .eq('lang', lang)
      .order('created_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'SUPABASE_ERROR', 500);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching directory items:', error);
    return [];
  }
}

export async function getBlogPosts(lang: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('lang', lang)
      .order('published_date', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'SUPABASE_ERROR', 500);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getDirectoryItem(id: string) {
  try {
    const { data, error } = await supabase
      .from('directory_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(error.message, 'SUPABASE_ERROR', 500);
    }

    return data;
  } catch (error) {
    console.error('Error fetching directory item:', error);
    return null;
  }
}

export async function getBlogPost(id: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(error.message, 'SUPABASE_ERROR', 500);
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}