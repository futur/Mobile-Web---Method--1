var UglifyJS = require("uglify-js");
var result = UglifyJS.minify([ "stcproxy.js", "server.js" ], {
    outSourceMap: "out.js.map"
});
console.log(result.code); // minified output
console.log(result.map);