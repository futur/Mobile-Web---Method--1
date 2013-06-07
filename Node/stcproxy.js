var http = require('http')
    ,httpProxy = require('http-proxy')
    ,url = require('url')
    ,wurfl = require('wurfl')
    ,path = require('path');

// var wurflFile = path.resolve(__dirname + '/wurfl.xml');
var options = { file: path.resolve(__dirname + '/wurfl.xml')};
console.log('laoding : ' + JSON.stringify(options));
wurfl.loadSync(options);
// wurfl.watch(options);

console.log('WURFL XML Loaded Successfully');

// var ua = 'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; O2 Xda 2s;PPC;240x320; PPC; 240x320)';
// var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36';
// console.log(wurfl.get(ua));


httpProxy.createServer(function (req, res, proxy) {
	console.log(url.parse(req.url));
	var devinfo = wurfl.get(req.headers['user-agent']);
	console.log('device : %s for UA : %s', JSON.stringify(devinfo), req.headers['user-agent']);
  	proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 3000
  });
}).listen(8000);