-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Directory items table
create table if not exists directory_items (
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
create table if not exists blog_posts (
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

-- Insert some sample data
insert into directory_items (title, description, content, tags, lang)
values 
  ('Tech Solutions Inc', 'Leading provider of enterprise software solutions', 'Detailed content here...', array['Technology', 'Software'], 'en'),
  ('Green Energy Co', 'Renewable energy solutions provider', 'Detailed content here...', array['Energy', 'Sustainability'], 'en'),
  ('Solutions Tech Inc', 'Fournisseur de solutions logicielles', 'Contenu détaillé ici...', array['Technologie', 'Logiciel'], 'fr');

insert into blog_posts (title, description, content, published_date, lang, tags)
values 
  ('Future of Technology', 'Exploring emerging tech trends', 'Blog content here...', now(), 'en', array['Technology', 'Innovation']),
  ('Sustainable Business', 'Green business practices', 'Blog content here...', now(), 'en', array['Business', 'Sustainability']),
  ('Avenir de la Technologie', 'Explorer les tendances technologiques', 'Contenu du blog ici...', now(), 'fr', array['Technologie', 'Innovation']);