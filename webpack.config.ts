import path from 'path'
import { Configuration } from 'webpack'

const isProd = process.env.NODE_ENV === 'production'

const config: Configuration = {
  entry: './client/index.tsx',
  mode: isProd ? 'production' : 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/static',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
}

export default config
