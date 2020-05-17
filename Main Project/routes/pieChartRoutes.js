const pieChartController = require("../controllers/pieChartController"); 
const path = require('path');   
const pieChartViewPath = path.join(__dirname, '..', 'views', 'pieChart'); 

 async function route(request, response){    
    //Find the file 
    let filePath = pieChartViewPath + request.url; 
    if (request.url == '/pieChart'){
        filePath = pieChartViewPath + '/pieChart.html';
    }

    //Send to controller the request
    switch (request.method) {
        case "GET":
            retCode = pieChartController.getHandler(filePath, response); 
            break
        case "POST":
            retCode = pieChartController.postHandler(filePath, response); 
    }  
}    


module.exports.route = route;