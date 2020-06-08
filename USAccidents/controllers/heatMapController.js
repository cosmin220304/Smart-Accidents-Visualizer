const fs = require('fs');
const path = require('path');  
const qs = require('querystring');  
var model = require('../models/model')
const html = require('../microservices/HtmlAux')
const mongoose = require('mongoose')

async function getHandler(filePath, response){ 
    //Open and return it if is .html,.css or .js
    if(!filePath.includes('?'))
    {
        fs.readFile(filePath, 'utf8', function(error, content) 
        {   
            var type = getContentType(filePath);
            response.writeHead(200, { 'Content-Type': type })
            content = html.transform(content)
            response.end(content) 
        });  
    }
    else{
        response.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(filePath.split('?')[1]);
        var json = qs.parse(filePath.split('?')[1]);
        console.log(json);
        var rez = await model.count(json);
        console.log(rez);
        response.end(JSON.stringify(rez))
    }
}  
  
async function postHandler(filePath, response){  
    //Used for getting the request data
    let reqBody = '';
    var obj;
    console.log(request);  

    //Print any error
    request.on('error', (err) => { 
        console.error(err.stack);
    });

    //Get the data
    request.on('data',function(data){
        reqBody += data;
        obj = JSON.parse(reqBody);
    });


    request.on('end', function(){
        response.writeHead(200, { 'Content-Type': 'application/json' });
        console.log("body");
        obj['_id'] = new mongoose.Types.ObjectId();
        console.log(obj);
        model.save(obj);
        response.end(reqBody);
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