class LightningExpressPlugin {

  apply(compiler) {
    const fs = require('fs')
    var environment = process.env.DEPLOYABLE_ENV
    if (!fs.existsSync('./public')){
      fs.mkdirSync('./public');
    }
    fs.writeFileSync('./.env', environment)
    fs.writeFileSync('./public/.env', environment)

    const _ = require('lodash')
    const config = require('./src/config')
    const aggregateBindings = require('@monsantoit/phoenix-service-bindings-middleware')

    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('LightningExpressPlugin', (compilation, callback) => {
      config
        .init()
        .then(() => {
          console.log('LightningExpressPlugin ready')
          
          const server = require('./server')
    
          if (!fs.existsSync('./public/scripts')){
            fs.mkdirSync('./public/scripts');
          }

          var time = new Date
          var version = process.env.npm_package_version

          const deployableVersion = {
            "environment": environment,
            "version": version 
          }

          fs.writeFileSync(
            './public/deployable-version.json',
            JSON.stringify(deployableVersion)
          )

          var manifest = `Build environment: ${environment}\n`
          manifest +=  `Build version: ${version}\n`
          manifest += `In this build, as of ${time}:\n`

          const defaultClientBindings = config.config
          const serviceBindings = aggregateBindings.getJson(defaultClientBindings,{localOcelot: true,})
            
          fs.writeFileSync(
            './public/service-bindings.js',
            serviceBindings
          )

          for (var filename in compilation.assets) {
            manifest += '- ' + filename + '\n'
          }

          compilation.assets['manifest.md'] = {
            source: function() {
              return manifest
            },
            size: function() {
              return manifest.length
            }
          }
          server.close()
          callback()
      })
    })
    compiler.hooks.done.tap("LightningExpressPluginFinished", (stats) => {
      console.log("LightningExpressPlugin has finished");
      setTimeout(() => {
        process.exit(0);
      })
    })
  }
}
  
module.exports = LightningExpressPlugin
