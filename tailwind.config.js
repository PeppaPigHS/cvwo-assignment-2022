module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.{ts,tsx}',
  ],
  plugins: [require('@tailwindcss/forms')],
  safelist: [
    {
      pattern: /grid-cols-.+/,
    },
  ],
}
