module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require('autoprefixer')(),
    require('postcss-class-prefix')('code-states-visualizer-', { ignore: [/cm/, /CodeMirror/] }),
    /* eslint-enable global-require */
  ],
};
