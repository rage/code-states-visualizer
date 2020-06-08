module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require("autoprefixer")(),
    require("postcss-class-prefix")("code-states-visualizer-", {
      ignore: [/cm/, /CodeMirror/, "focus-visible", /rc-slider/],
    }),
    /* eslint-enable global-require */
  ],
}
