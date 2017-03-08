/*jshint node:true, es3:false, esversion:6*/
'use strict';
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var port = parseInt(process.argv[2] || 8080, 10);
var cwd = process.cwd();

var mimes = {
	'.css': 'text/css',
	'.json': 'application/json',
	'.md': 'text/x-markdown',
	'.woff': 'application/font-woff',
	'.svg': 'image/svg+xml',
	'.svgz': 'image/svg+xml'
};

var server = http.createServer(function (request, response) {
	function writeStatus(statusCode, message) {
		response.writeHead(statusCode, { 'Content-Type': 'text/plain' });
		response.write(message);
		response.end();
	}

	var uri = url.parse(request.url).pathname;

    if(uri === '/') {
        uri = 'src/';
    }

	var filename = path.join(cwd, uri);

	if (filename.indexOf(cwd) !== 0) {
		server.close();
		console.log('\nInvalid path received.. Exiting\n');
		process.exit(0);
	}

	fs.stat(filename, function (error, stat) {
        if (error) {
            writeStatus(404, '404 Not Found\n');
            return;
        }

		if (stat && stat.isDirectory()) {
			filename = path.join(filename, 'index.html');
		}

        if(filename === '/index.html') {
            filename = 'src/index.html';
        }

		fs.readFile(filename, function (err, file) {
            if(err) {
                writeStatus(500, err + '\n');
                return;
            }

			var mime = mimes[path.extname(filename)];
			if (mime) {
				response.setHeader('Content-Type', mime);
			}
			response.statusCode = 200;
			response.write(file, 'binary');
			response.end();
		});
	});
}).listen(port);

console.log('Static server running at\n=> http://localhost:' + port + '/\nCTRL + C to shutdown\n');