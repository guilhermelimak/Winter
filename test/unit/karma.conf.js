'use strict'

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const baseConfig = require('../../webpack.renderer.config')
const projectRoot = path.resolve(__dirname, '../../app')

let webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"testing"'
    })
  ]
})

// don't treat dependencies as externals
delete webpackConfig.entry
delete webpackConfig.externals
delete webpackConfig.output.libraryTarget

// only apply babel for test files when using isparta
webpackConfig.module.rules.some(rule => {
  if (rule.use === 'babel-loader') {
    rule.include.push(path.resolve(projectRoot, '../test/unit'))
    return true
  }
})

// apply vue option to apply isparta-loader on js
webpackConfig.module.rules
  .find(rule => rule.use.loader === 'vue-loader').use.options.loaders.js = 'babel-loader'

module.exports = config => {
  config.set({
    browsers: ['Electron'],
    client: {
      useIframe: false
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    customLaunchers: {
      'visibleElectron': {
        base: 'Electron',
        flags: ['--show']
      }
    },
    frameworks: ['mocha', 'chai'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    singleRun: false,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
