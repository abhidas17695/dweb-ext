//
//download('abhidas17695/dweb-ext', 'dist-dweb', function (err) {
//});
//
//
//download('abhidas17695/dweb-transports', 'dist-combo', function (err) {
//    console.log(err);
//});

var Git = require("nodegit");

Git.Clone("https://github.com/abhidas17695/dweb-ext", "./dist-dweb").then(function(repository) {
  Git.Clone("https://github.com/abhidas17695/wayback-machine-chrome-AF-BF", "./dist-combo").then(function(repository) {
  
});
});
