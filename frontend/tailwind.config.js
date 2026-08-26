/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vert-profond':  '#24333A',
        'vert-sauge':    '#45645B',
        'vert-gris':     '#7A8D7D',
        'beige':         '#C8B99A',
        'beige-clair':   '#E9E5DB',
        'blanc-casse':   '#F6F6F2',
        'anthracite':    '#1E1E1E',
        'gris-doux':     '#6F6F6F',
      },
      fontFamily: {
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        display:  ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        script:   ['var(--font-corinthia)', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'hover:text-vert-profond',
    'hover:border-vert-sauge',
    'hover:border-vert-gris',
    'hover:border-beige',
    'border-vert-profond',
    'border-vert-gris',
    'border-beige',
    'border-transparent',
    'text-vert-gris',
  ],
};
