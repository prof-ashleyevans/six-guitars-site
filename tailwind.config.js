/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
                    },
                },
            },
        },
    },
    plugins: [],
}
