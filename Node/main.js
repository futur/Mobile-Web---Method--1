var http=require("http"),httpProxy=require("http-proxy"),url=require("url"),path=require("path"),wurfl_cloud_client=require("./WurflCloudClient/NodeWurflCloudClient/WurflCloudClient"),config=require("./WurflCloudClient/NodeWurflCloudClient/Config");var api_key="125466:pz7ICr0xOhY3Be6b8HaluqygTtE9mwDM";var configuration=new config.WurflCloudConfig(api_key);var brand;var result_capabilities={};var WURFLCloudClientObject;function WurflCloud(req,res,deviceParams,DetectionSuccess,DetectionFailure){if(typeof WURFLCloudClientObject==="undefined"){console.log("first time init -- not required")}WURFLCloudClientObject=new wurfl_cloud_client.WurflCloudClient(configuration,req,res);WURFLCloudClientObject.detectDevice(req,null,function(err,result_capabilities){for(var param in deviceParams){console.log("req param : "+deviceParams[param]);WURFLCloudClientObject.getDeviceCapability(deviceParams[param],function(error,value){if(error!=null){DetectionFailure(error,deviceParams[param])}else{DetectionSuccess(value,deviceParams[param])}})}})}httpProxy.createServer(function(req,res,proxy){function DetectionSuccess(value,param){console.log(param+" : "+value)}function DetectionFailure(error,param){console.log("Error"+error)}WurflCloud(req,res,["brand_name","resolution_width"],DetectionSuccess,DetectionFailure);console.log(req.headers["user-agent"]);proxy.proxyRequest(req,res,{host:"localhost",port:3e3})}).listen(8e3);var path=require("path");var express=require("express");var app=express();console.log(path.resolve(__dirname+"/flickrpics/"));app.enable("trust proxy");app.use(express.static(path.resolve(__dirname+"/flickrpics/")));app.use(function(req,res,next){console.log("%s %s",req.method,req.url);next()});app.use(function(req,res,next){res.send("Welcome home")});app.listen(3e3);