const fs = require('fs');
const path = require('path');  
const qs = require('querystring');  
const homeModel = require('../models/model')

//View path
const homeViewPath = path.join(__dirname, '..', 'views', 'home'); 

function getHandler(request, response){ 
    //Returned response Code
    let retCode = 200;

    //Get the filepath
    let query = '';
    const url = request.url.split('?');
    let filePath = homeViewPath + url[0]; 
    if (url[0] == '/home' || url[0] == '/'){
        filePath = homeViewPath + '/home.html';
        query = qs.parse(url[1]);
    }    
  
    //Read and return the file content if file was found
    fs.readFile(filePath, function(error, content) 
    { 
        if (error)  
            retCode = 404; 
 
        response.writeHead(200, { 'Content-Type': getContentType(filePath) });
        response.end(content); 
    }); 

    return retCode;
}  

function postHandler(request, response){

    //Find the file path
    let filePath = homeViewPath + request.url; 
    if (request.url == '/home' || request.url == '/'){
        filePath = homeViewPath + '/home.html';
    }  

    //Used for getting the request data
    let reqBody = '';
    let formatedReqBody = '';  

    //Print any error
    request.on('error', (err) => { 
        console.error(err.stack);
    });

    //Get the data
    request.on('data',function(data){
        reqBody += data;  
        if (reqBody.length > 1e6)
            request.connection.destroy();
    });

    //Process it and send a response
    request.on('end', function(){ 
        formatedReqBody = qs.parse(reqBody);  
        let jsonResponse = { 'a':'3'} //homeModel.find(reqBody);
        
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(jsonResponse));
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

function showCookies(request){
    var list = {},
    rc = request.headers.cookie; 
    if (rc)
        console.log('Cookies:',rc);
    else 
        console.log('No cookies found!');
}

module.exports.getHandler = getHandler;
module.exports.postHandler = postHandler;