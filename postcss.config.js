module.exports = ({ file, options }) => {
  return {
    plugins: {
      cssnano: {
        preset: ['default',
          { discardComments: { removeAll: true } }
        ]
      },
      autoprefixer: true,
    },
  };
};
