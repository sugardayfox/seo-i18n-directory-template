import type { APIRoute } from 'astro';
import { supabase } from '../../../utils/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('directory_items')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error submitting listing:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit listing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};