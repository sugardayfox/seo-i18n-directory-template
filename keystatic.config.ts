import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({ label: 'Published Date' }),
        description: fields.text({ label: 'Description' }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
          ],
          defaultValue: 'en'
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    directory: collection({
      label: 'Directory Items',
      slugField: 'title',
      path: 'src/content/directory/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: props => props.value,
        }),
        description: fields.text({ label: 'Description' }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
          ],
          defaultValue: 'en'
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});