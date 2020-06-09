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
        //Checking for NOSQL injection
        if (data.includes("$")){
            response.writeHead(401, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ "Response": "Invalid User/Password" }))
            response.end();
        }
        else{
            reqBody += data;
            payload = JSON.parse(reqBody);
        }
    });

    //Auth function
    request.on('end', async function () {
        
        var resultUser = await model.findByUser(payload.user); // Checks wether the given user exists in DB
        
        // If the user exists and the given password matches the encoded password from the DB, then creates a new JWT
        // with the given payload and a key
        if (resultUser && bcrypt.compareSync(payload.password, resultUser.password)) {
            token = jwt.sign(payload, key.secretKey);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ "Response": "Logged! ", "Token:": token }))
            response.end();
        } else{
            response.writeHead(401, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ "Response": "Invalid User/Password" }))
            response.end();
        }
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

        //Get token from header
        let token = request.headers.authorization

        // Token is needed to begin register 
        if (token == undefined) {
            response.writeHead(401, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ "Response": "No token found. You need to auth first." }))
        }
        else {
            token = token.split(' ')[1]; //actual token
            try {
                // Asynchronously verify given token using a public key to get a decoded token 
                var verif = jwt.verify(token, key.secretKey)
                
                //User needs to enter user and password
                if (payload.user === undefined || payload.password === undefined) {
                    response.writeHead(403, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ "Error": "Expected: {'user': 'user', 'password' : 'password'}" }))
                }
                else {
                    var user = payload.user;
                                        
                    var resultUser = await model.findByUser(user); //Checks wether the user already exists in the DB
                    if (!resultUser) {
                        //Adding new user to DB
                        payload['_id'] = new mongoose.Types.ObjectId()
                        try {
                            var encPass = bcrypt.hashSync(payload.password, 10) // encrypting the password given by the user
                            payload.password = encPass
                            model.save(payload) //Saving the new username & enc password to DB
                            response.writeHead(200, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ "Response": "Register successful!" }))
                        }
                        catch (e) {
                            response.writeHead(403, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ "Response": e }))
                        }
                    }
                    else {
                        console.log(resultUser.user + "id  --  pw" + resultUser.password)
                        response.writeHead(403, { 'Content-Type': 'application/json' })
                        response.end(JSON.stringify({ "Error": "Username already exists." }))
                    }
                }
            } catch (e) {
                //Incorrect token. jwt.verify() threw an error
                response.writeHead(401, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ "Response": "Failed to auth. Invalid token." }))
            }
        }
    });
}

async function getHandler(request, response) {
    //Checks wether a token is valid or not using GET 
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
