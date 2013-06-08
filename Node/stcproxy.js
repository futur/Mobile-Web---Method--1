var http = require('http')
    ,httpProxy = require('http-proxy')
    ,url = require('url')
    ,path = require('path')
    ,wurfl_cloud_client = require("./WurflCloudClient/NodeWurflCloudClient/WurflCloudClient")
	,config = require("./WurflCloudClient/NodeWurflCloudClient/Config");

var api_key = "125466:pz7ICr0xOhY3Be6b8HaluqygTtE9mwDM";
var configuration = new config.WurflCloudConfig(api_key);


var brand;
var result_capabilities = {};
var WURFLCloudClientObject;

function WurflCloud(req,res,deviceParams,DetectionSuccess,DetectionFailure){
	if (typeof WURFLCloudClientObject === 'undefined') {
		console.log('first time init -- not required');
	}
	WURFLCloudClientObject = new wurfl_cloud_client.WurflCloudClient(configuration, req,res);
    WURFLCloudClientObject.detectDevice(req, null, function(err, result_capabilities){
    	for(var param in deviceParams){
    		console.log('req param : '+ deviceParams[param]);
    		WURFLCloudClientObject.getDeviceCapability(deviceParams[param], function(error, value){
        if(error!=null){
            DetectionFailure(error,deviceParams[param]);
        }
        else{
            DetectionSuccess(value,deviceParams[param]);
        }
    });
    	}
	});
}


httpProxy.createServer(function (req, res, proxy) {
	// console.log(url.parse(req.url));
	function DetectionSuccess(value,param){
		console.log(param + ' : ' + value);
	}
	function DetectionFailure(error,param){
		console.log('Error' + error);
	}
	WurflCloud(req,res,['brand_name','resolution_width'],DetectionSuccess,DetectionFailure);
	// var devinfo = wurfl.get(req.headers['user-agent']);
	console.log(req.headers['user-agent']);
  	
  	proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 12000
  });
}).listen(process.env.port || 11000);