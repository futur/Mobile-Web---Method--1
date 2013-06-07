/**
 * This software is the Copyright of ScientiaMobile, Inc.
 * 
 * Please refer to the LICENSE.txt file distributed with the software for licensing information.
 * 
 * Example of using Node.JS Client to connect on WURFL Cloud Service
 * To run: node index.js 
 * (Node.JS ver. 0.8.6)
 */
var http = require('http');
var wurfl_cloud_client = require("./NodeWurflCloudClient/WurflCloudClient");
var config = require("./NodeWurflCloudClient/Config");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
	'There are two examples demonstrating the use of WURFL Cloud Client on Node.JS:'+
	'<br>example and example2. Just make sure that you entered your valid API_KEY' +
	'<br>inside the code in the examples found in exampleApp.js file and' +
	'<br>that the requested characteristics "brand name" and "is_wireless_device"'+
	'<br>have been activated in your WURFL Cloud Account page.'+
	'<br>'+
    '<form action=/example>'+
	'<input type="submit" value="example" />'+
    '</form>'+
    '<form action=/example2>'+
	'<input type="submit" value="example2" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function favicon(response) {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
}

function example(response, request) {

    var brand, is_wireless;
    var result_capabilities = {};
    //Please be sure to  substitute the following api_key with your own.
    var api_key = "XXXXXX:YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY";

    var configuration = new config.WurflCloudConfig(api_key);
    var WurflCloudClientObject =  new wurfl_cloud_client.WurflCloudClient(configuration, request, response);

    response.setHeader("Content-Type", "text/html");
    WurflCloudClientObject.detectDevice(request, null, function(err, result_capabilities){
	console.log("All capabilities available:" + JSON.stringify(result_capabilities));
	WurflCloudClientObject.getDeviceCapability('brand_name', function(error, brand){
	    if(error!=null){
		response.write("<br>Error: " + error + " <br/>");
		response.end();
	    }else{
		WurflCloudClientObject.getDeviceCapability('is_wireless_device', function(error, is_wireless){
		    if(error!=null){
			response.write("<br>Error: " + error + " <br/>");
		    }else{
			response.write("<br>"+ 'Is Wireless Device: ' + is_wireless + " <br/>");
			response.write("<br>"+ 'Brand Name: ' + brand + " <br/>");
		    }
		    response.end();
		});
	    }
	});
    });
}


function example2(response, request) {

    var result_capabilities = {};
    //Please include in the request_capabilities array all the capabilities
    //you are going to use inside your code.
    var request_capabilities = ['brand_name','is_wireless_device']
    //Please be sure to  substitute the following api_key with your own.
    var api_key = "XXXXXX:YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY";
    var configuration = new config.WurflCloudConfig(api_key);
    var WurflCloudClientObject =  new wurfl_cloud_client.WurflCloudClient(configuration, request, response);

    response.setHeader("Content-Type", "text/html");
    WurflCloudClientObject.detectDevice(request, request_capabilities, function(err, result_capabilities){
	if(err!=null){
	    response.write("<br>Error: " + err + " <br/>");
	}
	else{
	    response.write("<br>"+ 'Brand Name: ' + result_capabilities['brand_name'] + " <br/>");
	    response.write("<br>"+ 'Is Wireless Device: ' + result_capabilities['is_wireless_device'] + " <br/>");
	}
	response.end();
    });
}

exports.start = start;
exports.favicon = favicon;
exports.example = example;
exports.example2 = example2;
