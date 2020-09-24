module.exports = {
  plugins: [
    require('autoprefixer')({
      "overrideBrowserslist": ["> .5%", "last 2 versions"]
    }),
    require('postcss-preset-env')
  ]
}