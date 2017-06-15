module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require('autoprefixer')(),
    require('postcss-class-prefix')('code-states-visualizer-', { ignore: [/cm/, /CodeMirror/, 'focus-ring', 'rc-slider-tooltip-inner', 'rc-slider-handle', 'rc-slider-rail', 'rc-slider-track'] }),
    /* eslint-enable global-require */
  ],
};
