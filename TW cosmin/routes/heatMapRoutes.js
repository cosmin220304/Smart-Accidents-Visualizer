const heatMapController = require("../controllers/heatMapController"); 
const path = require('path');  
const heatMapViewPath = path.join(__dirname, '..', 'views', 'heatMap'); 

async function route(request, response){   
    //Find the file 
    let filePath = heatMapViewPath + request.url; 
    if (request.url == '/heatMap'){
        filePath = heatMapViewPath + '/heatMap.html';
    } 
    
    //Send to controller the request
    switch (request.method) {
        case "GET":
            heatMapController.getHandler(filePath, response); 
            break
        case "POST":
            heatMapController.postHandler(filePath, response); 
    }  
}    

module.exports.route = route;