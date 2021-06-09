const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss')('./config/tailwind.config.js'),
              require('autoprefixer'),
              purgecss({
                content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.scss'],
                whitelistPatterns: [/^bg-/, /^text-/],
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
              }),
            ],
          },
        },
      },
    ],
  },
};
