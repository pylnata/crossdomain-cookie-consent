const path = require('path')

module.exports = {
  mode: 'production',
  //devtool: 'inline-source-map',
  entry: {
    'index.webpack': path.resolve('./src/index.js'),
  },
  output: {
    library: 'SharedCookieConsent',
    libraryExport: 'default',
    libraryTarget: 'window',
    filename: 'shared-cookie-consent.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
}
