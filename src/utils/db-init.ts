import { supabase } from './supabase';
import { AppError } from './error';

export async function initializeDatabase() {
  try {
    // Enable UUID extension
    const { error: uuidError } = await supabase.rpc('create_extension', {
      name: 'uuid-ossp'
    });

    if (uuidError) {
      console.warn('UUID extension error (may already exist):', uuidError);
    }

    // Create directory_items table
    const { error: dirError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS directory_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[] NOT NULL DEFAULT '{}',
        lang TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);

    if (dirError) {
      throw new AppError(
        `Failed to create directory_items table: ${dirError.message}`,
        'DB_INIT_ERROR',
        500
      );
    }

    // Create blog_posts table
    const { error: blogError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        published_date TIMESTAMP WITH TIME ZONE NOT NULL,
        lang TEXT NOT NULL,
        tags TEXT[] NOT NULL DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);

    if (blogError) {
      throw new AppError(
        `Failed to create blog_posts table: ${blogError.message}`,
        'DB_INIT_ERROR',
        500
      );
    }

    // Insert sample data if tables are empty
    await insertSampleData();

    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

async function insertSampleData() {
  // Check if directory_items is empty
  const { data: dirItems } = await supabase
    .from('directory_items')
    .select('id')
    .limit(1);

  if (!dirItems?.length) {
    const { error: dirError } = await supabase
      .from('directory_items')
      .insert([
        {
          title: 'Tech Solutions Inc',
          description: 'Leading provider of enterprise software solutions',
          content: 'Detailed content about Tech Solutions Inc...',
          tags: ['Technology', 'Software'],
          lang: 'en'
        },
        {
          title: 'Green Energy Co',
          description: 'Renewable energy solutions provider',
          content: 'Detailed content about Green Energy Co...',
          tags: ['Energy', 'Sustainability'],
          lang: 'en'
        }
      ]);

    if (dirError) {
      console.error('Error inserting sample directory items:', dirError);
    }
  }

  // Check if blog_posts is empty
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('id')
    .limit(1);

  if (!blogPosts?.length) {
    const { error: blogError } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: 'Welcome to Our Blog',
          description: 'Introduction to our new blog platform',
          content: 'Welcome to our blog! Here we will share insights...',
          published_date: new Date().toISOString(),
          lang: 'en',
          tags: ['Welcome', 'Introduction']
        }
      ]);

    if (blogError) {
      console.error('Error inserting sample blog posts:', blogError);
    }
  }
}