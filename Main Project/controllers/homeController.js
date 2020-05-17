const fs = require('fs'); 
const qs = require('querystring');  
const path = require('path'); 
const homeModel = require('../models/model')

async function getHandler(response, resource){   
    fs.readFile(resource, function(error, content) 
    {   
        response.writeHead(200, { 'Content-Type': getContentType(resource) });
        response.end(content); 
    });  
}  

//TODO: finish this
async function getHandlerWithQuery(response, resource, queryString){ 
    //Use query to search throw model
     
    
    fs.readFile(resource, function(error, content) 
    {   
       response.writeHead(200, { 'Content-Type': getContentType(resource) });
       response.end(content); 
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

module.exports.getHandler = getHandler; 