/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        text: {
          DEFAULT: 'var(--color-text)',
          light: 'var(--color-text-light)',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}