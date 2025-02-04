const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Uygulamanın giriş noktası
  output: {
    path: path.resolve(__dirname, 'dist'), // Çıkış klasörü
    filename: 'bundle.js', // Çıkış dosyası
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Desteklenen dosya uzantıları
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // TypeScript ve TSX dosyalarını işlemek için
        use: 'ts-loader',
        exclude: /node_modules/, // node_modules klasörünü dışla
      },
      {test: /\.css$/i,
        use: ['style-loader', 'css-loader'],},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML dosyasını bağlar
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Statik dosyalar için klasör
    },
    port: 3000, // Uygulamanın çalışacağı port
    open: true, // Tarayıcıyı otomatik aç
    hot: true, // Hot Module Replacement (HMR)
    historyApiFallback: true, // SPA'ler için
  },
};