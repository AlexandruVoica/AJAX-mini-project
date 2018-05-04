var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var cors = require('cors');
var app = connect();

app
    .use(serveStatic('.'))
    .use(cors());

http.createServer(app).listen(8080, function(){
    console.log('Server running on 8080...');
});