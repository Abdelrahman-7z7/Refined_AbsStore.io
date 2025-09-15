/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'dark-black': '#111',
        'light-gray': '#d3d3d3',
        'secondary-gray': '#808080',
        'placeholder-gray': 'rgb(163, 163, 163)',
        'primary-green': '#369e62',
        'hover-green': 'rgb(0, 104, 0)',
        'orange-accent': '#FFC47E',
        'border-gray': '#888585',
        'focus-orange': '#ff994f',
      },
      backgroundImage: {
        'contact-gradient': 'linear-gradient(90deg, rgba(225,212,187,1) 45%, rgba(227,227,227,1) 77%)',
      },
    },
  },
  plugins: [],
}