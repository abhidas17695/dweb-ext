module.exports = {
  entry: {
    'bundle': './bootloader.js',
  },
  output: {
    filename: 'bundle.js'
  },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        Buffer: true,
        setImmediate: false,
        console: false,
        global:true
    },

    resolve: {
        alias: {
            zlib: 'browserify-zlib-next'
        }
    }
}