module.exports = {
  "presets": [[
    "@babel/preset-env",
    {
      "targets": {
        "browsers": ["> .5%", "last 2 versions"]
      },
      "corejs": 2,
      "useBuiltIns": "usage"
    }
  ], "@babel/preset-react"],
  "plugins": ["react-hot-loader/babel"]
}