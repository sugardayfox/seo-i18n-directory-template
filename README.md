# Directory Website

A multilingual directory website built with Astro, React, and Supabase.

## Features

- 🌍 Multilingual support (13 languages)
- 📱 Responsive design
- 🎨 Theme customization
- 🔍 Full-text search
- 📝 Content management with Supabase
- 🎯 SEO optimized

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project at https://supabase.com

4. Create the following tables in your Supabase database:

```sql
-- Directory items table
create table directory_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  content text not null,
  tags text[] not null default '{}',
  lang text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog posts table
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  content text not null,
  published_date timestamp with time zone not null,
  lang text not null,
  tags text[] not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table directory_items enable row level security;
alter table blog_posts enable row level security;

-- Create policies
create policy "Enable read access for all users" on directory_items
  for select using (true);

create policy "Enable read access for all users" on blog_posts
  for select using (true);
```

5. Copy `.env.example` to `.env` and add your Supabase credentials:

```bash
cp .env.example .env
```

6. Update the environment variables in `.env`:

```
PUBLIC_SUPABASE_URL=your-project-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

7. Start the development server:

```bash
npm run dev
```

## Theme Customization

The website supports multiple color schemes that can be enabled by adding a `data-theme` attribute to the root HTML element:

```js
// Available themes:
document.documentElement.setAttribute('data-theme', 'default'); // Blue theme
document.documentElement.setAttribute('data-theme', 'green');   // Green theme
document.documentElement.setAttribute('data-theme', 'purple');  // Purple theme
document.documentElement.setAttribute('data-theme', 'gray');    // Gray theme
document.documentElement.setAttribute('data-theme', 'dark');    // Dark theme
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```