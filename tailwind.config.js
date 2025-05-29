/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'flip-y': 'flipY 0.8s ease-out forwards'
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
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(12px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                flipY: {
                    '0%': { transform: 'rotateY(90deg)', opacity: '0' },
                    '100%': { transform: 'rotateY(0deg)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
