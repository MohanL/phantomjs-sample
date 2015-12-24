'use strict';

var page = require('webpage').create();
var system = require('system');

page.open(system.args[1], function(status) {

	console.log(page.evaluate(function() {
		return document.documentElement.innerHTML;
	}));

	phantom.exit();

});
