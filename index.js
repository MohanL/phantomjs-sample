'use strict';

var phantom = require('./lib/phantom');
var cheerio = require('cheerio');

var address = 'http://www.gatherproxy.com/proxylist/anonymity/?t=Elite';

phantom.request(address, function(err, html) {

	if(err) {
		console.log('error');
		return;
	}

	var $ = cheerio.load(html);

	var temp = $('#tblproxy tbody tr.loading-row');

	console.log('success!');

});
