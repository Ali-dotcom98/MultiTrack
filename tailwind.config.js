/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        charmonman: ['Charmonman'],
        sors: ["sors"],
        zentry: ['zentry', 'sanf-serif'],
        general: ['general', 'sanf-serif'],
        'circular-web': ['circular-web', 'sanf-serif'],
        'robert-medium': ['robert-medium', 'sanf-serif'],
        'robert-regular': ['robert-regular', 'sanf-serif'],
      },
      colors: {
        primary: "#ffaa00",
        "primary-accent": "#cc8800",
        "task_primary": "#1368EC",
        "task_primary_Background": "#fcfbfc",
        "bg-primary": "#f7f7f7",
        "bg-secondary": "#ffffff",
        "text-color": "#000000",
        "text-muted": "#777777",
        "color-white": "#ffffff",


        "primary-or": "#ff4400",
        "primary-or-acc": "#e93407",
        "primary-pr": '#610596',
        light: {
          "bg-primary": "#f7f7f7",
          "bg-secondary": "#ffffff",
          "text-color": "#000000",
          "text-muted": "#777777",
          "color-white": "#ffffff",
        },
        dark: {
          "bg-primary": "#0A0A0C",
          "bg-secondary": "#171719",
          "text-color": "#FFFFFF",
          "text-muted": "#999999",
          "bg-overlay": "rgb(10, 10, 12)",
          "gray-border": "rgba(89, 88, 88, 0.633)",
        },
        Pro5: {
          "bg-primary": "#ffffff",
          "bg-secondary": "#f7f7f7",
          "bg-accent": "#e0e0e0",
          "bg-base": "#121212",
          "bg-base2": "#1c1c1c",
          "text-color": "#000000",
          "text-muted": "#777777",
          "border-color": "#d1d5db",
          "color-white": "#ffffff",
          "color-success": "#33c648",
          "color-danger": "#fc605b",
          "color-warning": "#ffbb55",
          "primary": "#00aaff"
        }

      },
    },
  },
  daisyui: {
    themes: false,
  },

};
