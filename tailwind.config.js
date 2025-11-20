/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#10B981', // Green
                secondary: '#3B82F6', // Blue
                accent: '#F59E0B', // Orange
            },
        },
    },
    plugins: [],
}
