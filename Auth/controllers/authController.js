const jwt = require("jsonwebtoken")
const DB = require('../models/model')
const key = require("../values.js")
const bcrypt = require('bcrypt')
const model = require('../models/model')
const tokenAuthorization = require("../middleware/checkAuth")
const mongoose = require('mongoose');

async function postHandler(request, response) {
    //Used for getting the request data
    let reqBody = '';
    var payload;
    console.log(request);

    //Print any error
    request.on('error', (err) => {
        console.error(err.stack);
    });

    //Get the data
    var token;
    request.on('data', function (data) {
        reqBody += data;
        payload = JSON.parse(reqBody);
    });

    request.on('end', function () {
        console.log(payload);
        DB.countDocuments(payload)
            .then((countDocuments) => {
                if (countDocuments > 0) {
                    token = jwt.sign(payload, key.secretKey);
                    response.write(JSON.stringify({ "logged": true, "token": token }))
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify({ "Response": "Invalid User/Password" }))
                    response.end();
                }
            });
    });
}


async function postRegisterHandler(request, response) {
    //Used for getting the request data
    let reqBody = '';
    var payload;
    console.log(request);

    //Print any error
    request.on('error', (err) => {
        console.error(err.stack);
    });

    //Get the data
    var token;
    request.on('data', function (data) {
        reqBody += data;
        payload = JSON.parse(reqBody);
    });

    request.on('end', async function () {
        console.log(payload);
        if (payload.user === undefined || payload.password === undefined) {
            response.writeHead(403, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ "Error": "Expected: {'user': 'user', 'password' : 'password'}" }))
        }
        else {
            var user = payload.user;
            console.log(user)
            var resultUser  = await model.findByUser(payload.user);
            // console.log(resultUser)
            // if (resultUser) {
            //     payload['_id'] = new mongoose.Types.ObjectId()
            //     try {
            //         model.save(payload)
            //         response.writeHead(200, { 'Content-Type': 'application/json' })
            //         response.end(JSON.stringify({ "Response": "Success!" }))
            //     }
            //     catch (e) {
            //         response.writeHead(403, { 'Content-Type': 'application/json' })
            //         response.end(JSON.stringify({ "Response": e }))
            //     }
            // }
            // else {
            //     response.writeHead(403, { 'Content-Type': 'application/json' })
            //     response.end(JSON.stringify({ "Error": "Username already exists." }))
            // }

        }
    });
}

async function getHandler(request, response) {
    let token = request.headers.authorization
    if (token == undefined) {
        response.writeHead(401, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ "Response": "No token found" }))
    }
    else {
        token = token.split(' ')[1];
        tokenAuthorization.verifyAuth(token, response);
    }
}


module.exports.postRegisterHandler = postRegisterHandler;
module.exports.postHandler = postHandler;
module.exports.getHandler = getHandler;
