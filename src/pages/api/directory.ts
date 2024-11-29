import type { APIRoute } from 'astro';
import { supabase } from '../../utils/supabase';

export const GET: APIRoute = async ({ url }) => {
  const lang = url.searchParams.get('lang') || 'en';
  
  const { data, error } = await supabase
    .from('directory_items')
    .select('*')
    .eq('lang', lang)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}