import { getLangFromUrl, useTranslations } from './i18n';
import { supabase } from './supabase';
import type { DirectoryItem, BlogPost } from './supabase';

export async function performSearch(query: string, resultsContainer: HTMLElement) {
  const searchTerm = query.trim().toLowerCase();
  const currentLang = window.location.pathname.split('/')[1];
  const t = useTranslations(currentLang as 'en' | 'fr');
  
  if (!searchTerm || searchTerm.length < 2) {
    resultsContainer.innerHTML = `<p class="text-center text-gray-500">${t('search.start')}</p>`;
    return;
  }

  try {
    const [{ data: directory = [] }, { data: posts = [] }] = await Promise.all([
      supabase
        .from('directory_items')
        .select('*')
        .eq('lang', currentLang)
        .textSearch('title', searchTerm, { config: 'english' })
        .order('created_at', { ascending: false }),
      supabase
        .from('blog_posts')
        .select('*')
        .eq('lang', currentLang)
        .textSearch('title', searchTerm, { config: 'english' })
        .order('published_date', { ascending: false })
    ]);

    const results = [
      ...directory.map((item: DirectoryItem) => ({
        type: 'directory' as const,
        id: item.id,
        data: item
      })),
      ...posts.map((post: BlogPost) => ({
        type: 'post' as const,
        id: post.id,
        data: post
      }))
    ];

    resultsContainer.innerHTML = results.length ? results
      .map(result => `
        <a
          href="/${currentLang}/${result.type === 'directory' ? 'directory' : 'blog'}/${result.id}"
          class="block p-4 hover:bg-gray-50 rounded-lg"
        >
          <h3 class="font-semibold">${result.data.title}</h3>
          <p class="text-sm text-gray-600">${result.data.description}</p>
          <span class="text-xs text-gray-500 mt-1 inline-block">
            ${result.type === 'directory' ? 'Directory' : 'Blog'}
          </span>
        </a>
      `)
      .join('') : `<p class="text-center text-gray-500">${t('search.noResults')}</p>`;
  } catch (error) {
    console.error('Search error:', error);
    resultsContainer.innerHTML = `<p class="text-center text-red-500">${t('search.error')}</p>`;
  }
}