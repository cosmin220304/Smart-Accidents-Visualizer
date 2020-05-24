const fs = require('fs'); 
const qs = require('querystring');  
const path = require('path'); 
const homeModel = require('../models/model')
const parser = require('node-html-parser');

async function getHandler(response, resource){   
    fs.readFile(resource, 'utf8', function(error, content) 
    {   
        var type = getContentType(resource);
        response.writeHead(200, { 'Content-Type': type })
        if (type == 'text/html')
        {    
            var htmlFromAlex = `<div class="topnav">
            <a href="/">Home</a> 
            <a href="../heatMap">Heat Map</a>
            <a href="../pieChart">Pie chart</a>
            <a>Bar Graph</a>
            <a>Sankey diagram</a>
            <a>Contacts</a>
          </div>`
            content = content.replace(/^(.*){topnav}(.*)/gm, htmlFromAlex)
           // response.end(root) 
        }
        response.end(content) 
    });  
}  

//TODO: finish this
async function getHandlerWithQuery(response, resource, queryString){ 
    //Use query to search throw model
    const test = await homeModel.findASD(qs.parse(queryString) ) 
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(test))
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

module.exports.getHandler = getHandler
module.exports.getHandlerWithQuery = getHandlerWithQuery