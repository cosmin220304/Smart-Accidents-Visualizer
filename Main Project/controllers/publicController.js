const fs = require('fs')
const path = require('path')
const model = require('../models/model')
const mongoose = require('mongoose')


async function getHandler(resource, response) {
    fs.readFile(resource, function (error, content) {
        response.writeHead(200, { 'Content-Type': getContentType(resource) })
        response.end(content)
    })
}


async function postHandler(request, response) {
    //Used for getting the request data
    let reqBody = ''
    var obj

    //Print any error
    request.on('error', (err) => {
        console.error(err.stack)
    })

    //Get the data
    request.on('data', function (data) {
        reqBody += data
        obj = JSON.parse(reqBody)
    })

    request.on('end', function () {
        create(obj, response)
    })
}


async function putHandler(request, response) {
    //Used for getting the request data
    let obj

    //Print any error
    request.on('error', (err) => {
        console.error(err.stack)
    })

    //Get the data
    request.on('data', function (data) { 
        obj = JSON.parse(data)
    })

    request.on('end', function () {
        update(obj, response, true)
    })

}


async function patchHandler(request, response) {
    //Used for getting the request data
    let obj

    //Print any error
    request.on('error', (err) => {
        console.error(err.stack)
    })

    //Get the data
    request.on('data', function (data) { 
        obj = JSON.parse(data)
    })

    request.on('end', function () {
        update(obj, response, false)
    })

}


function create(obj, response){
    if (obj == undefined) {
        response.writeHead(403, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "No body found" }))
    }
    else {
        obj['_id'] = new mongoose.Types.ObjectId()
        try {
            model.save(obj)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ "Response": "Success!" }))
        }
        catch (e) {
            response.writeHead(403, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ "Response": e }))
        }
    }
}


async function update(obj, response, upsertOk){
    if (obj == undefined) {
        response.writeHead(403, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "No body found" }))
    }
    else {
        const result = await model.update(obj["ID"], obj, upsertOk)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(result))
    }
}


function getContentType(filePath) {
    var extensionName = String(path.extname(filePath)).toLowerCase()
    var contentTypeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.txt': 'text/plain',
    }
    var contentType = contentTypeMap[extensionName]
    return contentType
}


module.exports.getHandler = getHandler
module.exports.postHandler = postHandler
module.exports.putHandler = putHandler
module.exports.patchHandler = patchHandler