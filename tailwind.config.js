import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                "on-secondary-fixed": "#281716",
                "secondary-fixed-dim": "#dfbfbd",
                "surface-tint": "#2d6766",
                "secondary-fixed": "#fcdbd9",
                "on-primary-container": "#82bbb9",
                "error-container": "#ffdad6",
                "on-surface": "#0b1c30",
                "primary-container": "#084c4b",
                "surface-container-low": "#eff4ff",
                "error": "#ba1a1a",
                "surface-container-highest": "#d3e4fe",
                "surface-container-high": "#dce9ff",
                "outline": "#707978",
                "primary-fixed": "#b3edeb",
                "secondary": "#715857",
                "tertiary-container": "#004c4a",
                "surface-container-lowest": "#ffffff",
                "inverse-primary": "#97d1cf",
                "surface": "#f8f9ff",
                "surface-dim": "#cbdbf5",
                "on-error-container": "#93000a",
                "inverse-on-surface": "#eaf1ff",
                "surface-container": "#e5eeff",
                "on-secondary": "#ffffff",
                "secondary-container": "#f9d8d6",
                "outline-variant": "#bfc8c7",
                "tertiary": "#003432",
                "on-tertiary-container": "#7abcb8",
                "primary-fixed-dim": "#97d1cf",
                "on-secondary-fixed-variant": "#584140",
                "on-primary-fixed": "#00201f",
                "on-secondary-container": "#755d5b",
                "on-surface-variant": "#404848",
                "on-tertiary": "#ffffff",
                "on-error": "#ffffff",
                "tertiary-fixed": "#abefeb",
                "background": "#f8f9ff",
                "on-tertiary-fixed-variant": "#00504d",
                "surface-bright": "#f8f9ff",
                "on-tertiary-fixed": "#00201f",
                "tertiary-fixed-dim": "#90d2ce",
                "surface-variant": "#d3e4fe",
                "on-background": "#0b1c30",
                "on-primary": "#ffffff",
                "inverse-surface": "#213145",
                "on-primary-fixed-variant": "#0e4f4e",
                "primary": "#003433"
            },
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
                "body-lg": ["Manrope"],
                "body-md": ["Manrope"],
                "headline-lg": ["Manrope"],
                "body-sm": ["Manrope"],
                "headline-md": ["Manrope"],
                "display-xl": ["Manrope"],
                "label-md": ["Manrope"]
            },
            fontSize: {
                "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "display-xl": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}],
                "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}]
            }
        },
    },

    plugins: [forms, require('@tailwindcss/container-queries')],
};
