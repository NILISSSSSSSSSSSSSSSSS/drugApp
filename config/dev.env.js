'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 内部开发环境
  // API_ROOT: '"http://192.168.0.9:9473"',
  // API_ROOT: '"http://192.168.0.110:9473"',
  // 内部本地环境
  // API_ROOT: '"http://192.168.0.14:9473"'
  // 线上测试环境
  API_ROOT: '"http://118.126.117.187:9473"'
})
