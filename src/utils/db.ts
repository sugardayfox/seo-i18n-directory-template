import { supabase } from './supabase';
import type { DirectoryItem, BlogPost } from './supabase';

export async function getDirectoryItems(lang: string) {
  const { data, error } = await supabase
    .from('directory_items')
    .select('*')
    .eq('lang', lang)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as DirectoryItem[];
}

export async function getBlogPosts(lang: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('lang', lang)
    .order('published_date', { ascending: false });

  if (error) throw error;
  return data as BlogPost[];
}

export async function getDirectoryItem(id: string) {
  const { data, error } = await supabase
    .from('directory_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as DirectoryItem;
}

export async function getBlogPost(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as BlogPost;
}

export async function submitDirectoryItem(data: Omit<DirectoryItem, 'id' | 'created_at' | 'updated_at'>) {
  const { error } = await supabase
    .from('directory_items')
    .insert([{
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);

  if (error) throw error;
}