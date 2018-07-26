var fs = require('fs');
var fileName = './dist-combo/manifest.json';
var file = require(fileName);

file.background.scripts = ["scripts/dweb-transports-bundle.js","scripts/dweb-objects-bundle.js","scripts/bootloader.js","scripts/background.js"];
file.content_security_policy="script-src 'self' 'unsafe-eval'; object-src 'self'";
fs.writeFile(fileName, JSON.stringify(file,null,2), function (err) {
  if (err) return console.log(err);
});