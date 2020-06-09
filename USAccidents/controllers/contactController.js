const fs = require('fs'); 
const path = require('path'); 
const html = require('../microservices/HtmlAux')


async function getHandler(response, resource){   
    fs.readFile(resource, 'utf8', function(error, content) 
    {   
        var type = getContentType(resource);
        response.writeHead(200, { 'Content-Type': type })
        content = html.transform(content)
        response.end(content) 
    });  
}  

function getContentType(filePath)
{
    var extensionName = path.extname(filePath)
    var contentTypeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json', 
    }
    var contentType = contentTypeMap[extensionName]
    return contentType
}

module.exports.getHandler = getHandler