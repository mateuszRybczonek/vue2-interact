module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    node: true,
    browser: true
  },
  'rules': {
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    requestAnimationFrame: true,
    performance: true
  }
}
