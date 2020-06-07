const fs = require('fs'); 
const qs = require('querystring');  
const path = require('path'); 
const homeModel = require('../models/model')
const html = require('../templates/HtmlAux');


async function getHandler(response, resource){   
    fs.readFile(resource, 'utf8', function(error, content) 
    {   
        var type = getContentType(resource);
        response.writeHead(200, { 'Content-Type': type })
        content = html.transform(content)
        response.end(content) 
    });  
}  

//TODO: finish this
async function getHandlerWithQuery(response, resource, queryString){ 
    //Use query to search throw model  
    queryJson = qs.parse(queryString) 
    const test = await homeModel.count(queryJson) 
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(test))
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
module.exports.getHandlerWithQuery = getHandlerWithQuery