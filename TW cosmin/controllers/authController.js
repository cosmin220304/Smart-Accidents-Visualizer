const jwt = require("jsonwebtoken")
 
function postHandler(request, response){  
    //Used for getting the request data
    let reqBody = '';
    var obj;
    console.log(request);  

    //Print any error
    request.on('error', (err) => { 
        console.error(err.stack);
    });

    //Get the data
    var token;
    request.on('data',function(data){
        reqBody += data;
        obj = JSON.parse(reqBody);
        token = jwt.sign(obj);
    });


    request.on('end', () => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({"token" : token}));
    });
}

module.exports.getHandler = getHandler;
module.exports.postHandler = postHandler;
