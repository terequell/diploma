const config = require('./configs/eslint.config');

module.exports = {
  ...config,
  plugins: [...config.plugins],
  rules: {
    ...config.rules,
  },
};
