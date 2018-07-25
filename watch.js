var watch = require('glob-watcher');
var cpx = require("cpx");
var watcher = watch(['dweb-objects/dist/dweb-objects-bundle.js', 'dweb-transports/dist/dweb-transports-bundle.js']);

console.log("glob-watcher is active");
watcher.on('change', function(path, stat) {
    cpx.copy(path, 'dist/scripts', function(error){})
});