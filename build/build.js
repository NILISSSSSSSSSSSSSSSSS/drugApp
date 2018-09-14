'use strict'
require('./check-versions')()
const env = process.argv[2];
process.env.NODE_ENV = 'production';

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const development_env = require('../config/dev.env')
if(env === 'development') {
  webpackConfig.plugins[0]['definitions']['process.env'] = development_env;
}
const spinner = ora('building for ' + env + '...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    var date = new Date();
    console.log(chalk.cyan('  Build complete.\n  ' + env))
    console.log(chalk.yellow('  Build time:' + date))
    // console.log(chalk.yellow(
    //   '  Tip: built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))
  })
})
