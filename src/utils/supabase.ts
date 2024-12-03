import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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