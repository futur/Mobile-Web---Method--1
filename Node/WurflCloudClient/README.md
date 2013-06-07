WurflCloudClient-NodeJS
=======================
This is the **WURFL Cloud Client** for **Node.JS**

*Copyright 2012, ScientiaMobile, Inc.  All rights reserved.*

----------


# Requirements #
- Node.JS version 0.8.2

# Installation #
Download and extract NodeWurflCloudClient and Libraries folders in the folder where your Node code is.
Include the following lines in your code:

   	var wurfl_cloud_client = require("./NodeWurflCloudClient/WurflCloudClient");
	var config = require("./NodeWurflCloudClient/Config");

## Configuration ##
Set API Key:

   	var api_key = "XXXXXX:YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY";
	var configuration = new config.WurflCloudConfig(api_key);

## Testing ##
After you have installed and configured the WURFL Client, put this code in a file:

	var brand;
	var result_capabilities = {};
	var WURFLCloudClientObject = new wurfl_cloud_client.WurflCloudClient(configuration, HttpRequest, HttpResponse);
	WURFLCloudClientObject.detectDevice(HttpRequest, null, function(err, result_capabilities){
		WURFLCloudClientObject.getDeviceCapability('brand_name', function(error, brand){
			if(error!=null){
				console.log('Error' + error);
			}else{
				console.log('Brand name: ' + brand);
			}
		});
	});				

You should see the brand name of your device in the console provided that you have already obtained a WURFL Cloud api key and that you have selected brand_name in your capabilities section.
Visit [WURFL Cloud Client - Getting Started](http://www.scientiamobile.com/wurflCloud/gettingStarted/ "ScientiaMobile WURFL Cloud Getting Started") for more information.

## Example application ##
After you have registered in WURFL Cloud Service [here](http://www.scientiamobile.com/cloud),
to run the example application on you browser do the following:
* Download and extract all the files in a folder.
* Inside the exampleApp.js enter your own WURFL Cloud api key.
* Select "brand_name" and "is_wireless_device" as your capabilities in ScientiaMobile WURFL Cloud website.
* Run the server/example application inside a console by "node index.js".
* Go to a Web Browser in http://localhost:8888
* Either chose example or example2.
You should see the brand name of your device and whether it is wireless or not.