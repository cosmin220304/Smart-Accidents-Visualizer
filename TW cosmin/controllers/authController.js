const jwt = require("jsonwebtoken")

const users = [{
    name: "gigi",
    password: "parola",
    type: "admin"
}];

function getHandler(request, response){ 

    //Find the file 
    let filePath = homeViewPath + request.url; 
    if (request.url == '/heatMap'){
        filePath = homeViewPath + '/heatMap.html';
    }
    
    console.log(request.url);
    //Open and return it if is .html,.css or .js
    fs.readFile(filePath, function(error, content) 
    { 
        if (error)  
            return 404; 
 
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.parse());
        return 200; 
    }); 
}  

function postHandler(request, response){

    //Find the file path
    let filePath = homeViewPath + request.url; 
    if (request.url == '/auth'){
        filePath = homeViewPath + '/auth.html';
    }  

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

    });
}

module.exports.getHandler = getHandler;
module.exports.postHandler = postHandler;
