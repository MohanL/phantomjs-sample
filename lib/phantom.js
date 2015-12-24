'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs');
var binPath = require('phantomjs').path;
var slice = Array.prototype.slice;

var phantomPath = path.join(
	__dirname,
	'..',
	'phantom'
);

exports = module.exports = function() {

	var args = slice.call(arguments);
	var callback = args.pop();

	var command = spawn(binPath, args);

	command.stdout.on('data', function(data) {
		callback(null, data.toString());
	});

	command.stderr.on('data', function(data) {
		callback({ message: data.toString() }, null);
	});

};

// create methods base on the ./phantom directory web page modules
fs.readdirSync(phantomPath).reduce(function(context, filename) {

	var index = path.basename(filename, '.js');

	context[index] = function() {
		exports.apply(null, [path.join(phantomPath, filename)].concat(slice.call(arguments)));
	};

}, exports);
