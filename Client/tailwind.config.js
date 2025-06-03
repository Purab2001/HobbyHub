// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode for Tailwind
    theme: {
        extend: {},
    },
    plugins: [
        import('daisyui'), // Register DaisyUI as a Tailwind plugin
    ],
    daisyui: {
        themes: ["light", "dark"], // or your custom themes
    },
}
