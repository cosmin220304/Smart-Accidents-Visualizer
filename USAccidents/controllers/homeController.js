const fs = require('fs')
const qs = require('querystring')
const path = require('path')
const html = require('../microservices/HtmlAux')
const homeModel = require('../models/model')


async function getHandler(request, response, resource){   
    //Simply read and return the file after it gets processed by htmlAux 
    fs.readFile(resource, 'utf8', function(error, content) 
    {   
        var type = getContentType(resource)
        response.writeHead(200, { 'Content-Type': type })
        content = html.transform(content)
        response.end(content) 
    });  
}  
 

async function getHandlerWithQuery(request, response, resource, queryString){  

    //Transform query string into variable
    let json = qs.parse(queryString)
    let modelResult
    let offset = 0
    let limit = 0

/*  OBSOLETE/SCRAPED IDEA    */
    // //Check if user only want to save the current html page
    // if (queryString.includes("saveCookies=true"))
    // { 
    //     response.writeHead(200, 
    //     {   
    //         'Set-Cookie': queryString +'; Max-Age=20',
    //         'Content-Type': 'text/html' 
    //     })
    //     response.end("Cookie saved!")
    //}

    //Check if any specification was sent through query
    if (json["Limit"] )
    {
        limit = parseInt(json["Limit"])
        delete json.Limit
    }
    if (json["Offset"]){ 
        offset = parseInt(json["Offset"])
        delete json.Offset 
    }

    //Use query to search throw model 
    modelResult = await homeModel.findCoordonates(json, offset, limit) 
    
    //Send back data
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(modelResult))
}  


function showCookies(request){
    var list = {},
    rc = request.headers.cookie
    if (rc)
        console.log('Cookies:',rc)
    else 
        console.log('No cookies found!')
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