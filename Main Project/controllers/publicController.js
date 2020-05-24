const fs = require('fs');  
const path = require('path'); 
const html = require('../templates/HtmlAux'); 

async function getHandler(resource, response){   
    fs.readFile(resource, function(error, content) 
    { 
        response.writeHead(200, { 'Content-Type': getContentType(resource) }) 
        response.end(content) 
    });  
}  

function getContentType(filePath)
{
    var extensionName = String(path.extname(filePath)).toLowerCase()
    var contentTypeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json', 
    }
    var contentType = contentTypeMap[extensionName]
    return contentType
}

module.exports.getHandler = getHandler;