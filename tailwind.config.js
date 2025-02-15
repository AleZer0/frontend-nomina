/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [
        // Agrega todas las variantes de grid-cols que usarás
        'grid-cols-5',
        'grid-cols-6',
        'grid-cols-8',
        // etc.
      ],
    theme: {
        extend: {},
    },
    plugins: [],
};
