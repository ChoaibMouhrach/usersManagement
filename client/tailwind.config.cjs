/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'white': '#f8f8f8',
      'danger': "#dc3545",
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      "success": "#198754",
      "gray-ish": "#f5f5f5",
      "warning": "#ffc107",
      "semitransparentdanger": "rgba(220,53,69,0.8)",
      "semitransparentpurple": "rgba(63,60,187,0.8)",
      "semitransparentsuccess": "rgba(25,135,84,0.8)",
      "semitransparentBlack": "rgba(0,0,0,0.8)",
      "semitransparentwarning": "rgba(255,193,7,0.8)"
    },
  },
  plugins: [],
}
