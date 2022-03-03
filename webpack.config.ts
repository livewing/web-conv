import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'; // eslint-disable-line import/default -- WTF
import { GenerateSW } from 'workbox-webpack-plugin';
import type { Configuration } from 'webpack';

const NODE_ENV =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const distPath = resolve(__dirname, 'dist');

const config: Configuration = {
  mode: NODE_ENV,
  entry: resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: distPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: {
                plugins: [{ removeViewBox: false }]
              }
            }
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html')
    }),
    new CopyPlugin({ patterns: ['resources'] }),
    ...(NODE_ENV === 'production'
      ? [
          new GenerateSW({
            swDest: resolve(distPath, 'sw.js'),
            skipWaiting: true,
            clientsClaim: true,
            cleanupOutdatedCaches: true
          })
        ]
      : [])
  ],
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : void 0
};
export default config;
