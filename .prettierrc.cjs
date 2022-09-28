module.exports = {
  semi: false,
  singleQuote: true,
  "space-before-function-paren": true,
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};