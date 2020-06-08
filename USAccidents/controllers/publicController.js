const fs = require('fs')
const path = require('path')
const model = require('../models/model')
const mongoose = require('mongoose')
const dataObserver = require('../microservices/data observer')
const publicResources = path.join(__dirname, '..', 'public')

//Used for simple html/css/js get
async function getHandler(resource, response) {
    fs.readFile(resource, function (error, content) {
        response.writeHead(200, { 'Content-Type': getContentType(resource) })
        response.end(content)
    })
}

//Used by 404 not found page
async function resourceNotFound(response){
    const file404 = publicResources + '/404.html' 
    fs.readFile(file404, function (error, content) { 
        response.writeHead(404, { 'Content-Type': getContentType(file404)})
        response.end(content)
    })
}

//Used for get on database records
async function handleRecords(request, response){
    var id = request.url.split('/')[2];
    var result = await model.findByID(id);
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ "Response": result }))
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

    //Get the data
    request.on('data', function (data) { 
        obj = JSON.parse(data)
    })

    request.on('end', function () {
        update(obj, response, false)
    })
}

async function deleteHandler(request, response){
    try {
        const id = request.url.split('/')[2];
        const result = await model.deleteByID(id);
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "Success" }))
    }
    catch(e){
        console.log(e)
        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "Unexpected error" }))
    }
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

            //Notify data observer microservice
            dataObserver.notify(obj)

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
    //Check if object is valid
    if (obj == undefined) {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "No body found" }))
    }
    else if (obj["ID"] === undefined){ 
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ "Response": "ID field is required" }))
    }
    else {
        //Wait for result after update
        const result = await model.update(obj["ID"], obj, upsertOk)

        //Notify data observer microservice
        if (result["Response Code"] == 200 || result["Response Code"] == 201){
            dataObserver.notify(obj)
        }

        //Send response
        response.writeHead(result["Response Code"], { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(result))
    }
}


function getContentType(filePath) {
    var extensionName = path.extname(filePath)
    var contentTypeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.txt': 'text/plain',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.png': 'image/png',
    }
    var contentType = contentTypeMap[extensionName]
    return contentType
}

module.exports.getHandler = getHandler
module.exports.handleRecords = handleRecords
module.exports.postHandler = postHandler
module.exports.putHandler = putHandler
module.exports.patchHandler = patchHandler
module.exports.resourceNotFound = resourceNotFound
module.exports.deleteHandler = deleteHandler