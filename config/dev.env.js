'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const path = require('path')
const PATH_DEV = path.resolve(__dirname, '../src')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PATH_DEV: `"${PATH_DEV}"`,
})
