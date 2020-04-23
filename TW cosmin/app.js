var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring'); 
port = 8128;     

http.createServer(function (request, response) {
    //See request
    console.log('request', request.method, request.url);    
    
    showCookies(request);
    
    //Process request
    switch (request.method) {
        case "GET":
            GET(request, response); 
            break;

        case "POST":
            var reqBody = '';
            var formData = "test"; 
            request.on('data',function(data){
                reqBody += data;  
                if (reqBody.length > 1e6)
                    request.connection.destroy();
            });
            request.on('end', function(){
                console.log(reqBody);
                formData = qs.parse(reqBody); 
                console.log(formData); 
                response.writeHead(200, {  'Set-Cookie': 'mycookie=test', 'Content-Type': 'application/json' });
                response.end(qs.stringify(formData));
            });
            break;

        default:
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end("<html><body><p>404 page not found</p></body></html>");
    }
}).listen(port); 

function showCookies(request){
    var list = {},
    rc = request.headers.cookie; 

    console.log(rc);
}

function GET(request, response){

    //Get filepath
    var filePath = '.' + request.url;
    if (filePath == './home' || filePath == './'){
        filePath = './home.html';
    } 

    //Read file content
    fs.readFile(filePath, function(error, content) 
    {
        //Check for error
        if (error) 
        {
            //Return "404 error" file in case searched file was not found
            if(error.code == 'ENOENT') 
            {
                fs.readFile('./404.html', function(error, content) 
                {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end("<html><body><p>404 page not found</p></body></html>");
                });
            } 

            //Return "unexpected error" file if searched file was found but could not be read
            else 
            {
                fs.readFile('./unexpected.html', function(error, content) 
                {
                    response.writeHead(402, { 'Content-Type': 'text/html' });
                    response.end("<html><body><p>something bad happened</p></body></html>");
                });
            }
        }

        //Return file content as response
        else 
        {
            response.writeHead(200, { 'Content-Type': getContentType(filePath) });
            response.end(content);
        }
    });
}

function getContentType(filePath)
{
    var extensionName = String(path.extname(filePath)).toLowerCase();
    var contentTypeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json', 
    }; 
    var contentType = contentTypeMap[extensionName];
    return contentType;
}
 
test = 'Server running at http://127.0.0.1:' + port + '/';
console.log(test);