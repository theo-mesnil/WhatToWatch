export default {
  plugins: ['@babel/plugin-transform-class-static-block'],
  presets: [['babel-preset-expo', { 'react-compiler': { enabled: true } }]],
}
