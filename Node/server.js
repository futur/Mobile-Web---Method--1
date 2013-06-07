var path = require('path');
var express = require('express');
var app = express();

console.log(path.resolve(__dirname + '/../flickrpics/'));
app.enable('trust proxy');
app.use(express.static(path.resolve(__dirname + '/../flickrpics/')));

app.use(function(req,res,next){
	console.log('%s %s',req.method,req.url);
	next();
});

app.use(function(req,res,next){
	res.send('Welcome home');
});

app.listen(3000);