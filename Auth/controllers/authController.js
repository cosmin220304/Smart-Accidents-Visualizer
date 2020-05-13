const jwt = require("jsonwebtoken")
const DB = require('../models/model')
const key = require("../values.js")
async function postHandler(request, response){  
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
    request.on('data',function(data){
        reqBody += data;
        payload = JSON.parse(reqBody);
    });
    request.on('end', function(){
        console.log(payload);
        DB.countDocuments(payload)
        .then((countDocuments) => {
          if (countDocuments > 0) {
            token = jwt.sign(payload, 'SecretKey');
            response.write(JSON.stringify({"logged": true, "token": token }))
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ "Response": "Invalid User/Password"}))
            response.end();          
        }
      });
    });
}


async function getHandler(request, response){  
    const token = request.headers.authorization.split(' ')[1];
    try {
        var verif = jwt.verify(token, key.secretKey)
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ "Response" : "Auth successful" }))
        response.end()
    } catch (e) {
        console.log(e)
        response.writeHead(403, 'aplication/json')
        response.write(JSON.stringify({ "Response" : "Failed to auth" }))
        response.end()
    }
}

module.exports.postHandler = postHandler;
module.exports.getHandler = getHandler;
