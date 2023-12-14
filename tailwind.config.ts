// tailwind.config.js
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        // ...
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './sections/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                '15': 'repeat(6, minmax(0, 1fr))',
            },
        },
    },

    plugins: [nextui()],
};
