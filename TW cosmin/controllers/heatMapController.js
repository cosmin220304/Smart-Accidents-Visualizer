const fs = require('fs');
const path = require('path');  
const qs = require('querystring');  
var model = require('../models/model')
const mongoose = require('mongoose')

//View path
const homeViewPath = path.join(__dirname, '..', 'views', 'heatMap'); 

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
 
        response.writeHead(200, { 'Content-Type': getContentType(filePath) });
        response.end(content);
        return 200; 
    }); 
}  

function getValueByKey(body, name)
{
    for (let [key, value] of Object.entries(body)) {
    if( `${key}` == name )
        return (`${value}`);
    }
}
function postHandler(request, response){

    //Find the file path
    let filePath = homeViewPath + request.url; 
    if (request.url == '/heatMap'){
        filePath = homeViewPath + '/heatMap.html';
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

    // var dataModel = new model({
    //         _id : new mongoose.Types.ObjectId(),
    //         ID:  getValueByKey(obj, 'ID'),
    //         Source: 'MapQuest',
    //         TMC: '201.0',
    //         Severity: '3',
    //         Start_Time: '2016-02-08 05:46:00',
    //         End_Time: '2016-02-08 11:00:00',
    //         Start_Lat: '39.865147',
    //         Start_Lng: '-84.058723',
    //         End_Lat: '',
    //         End_Lng: '',
    //         Distance : '0.01',
    //         Description: 'Right lane blocked due to accident on I-70 Eastbound at Exit 41 OH-235 State Route 4.',
    //         Number: '',
    //         Street: 'I-70 E',
    //         Side: 'R',
    //         City: 'Dayton',
    //         County: 'Montgomery',
    //         State: 'OH',
    //         Zipcode: '45424',
    //         Country: 'US',
    //         Timezone: 'US/Eastern',
    //         Airport_Code: 'KFFO',
    //         Weather_Timestamp: '2016-02-08 05:58:00',
    //         Temperature : '36.9',
    //         Wind_Chill: '',
    //         Humidity  : '91.0',
    //         Pressure : '29.68',
    //         Visibility : '10.0',
    //         Wind_Direction: 'Calm',
    //         Wind_Speed : '',
    //         Precipitation : '0.02',
    //         Weather_Condition: 'Light Rain',
    //         Amenity: 'False',
    //         Bump: 'False',
    //         Crossing: 'False',
    //         Give_Way: 'False',
    //         Junction: 'False',
    //         No_Exit: 'False',
    //         Railway: 'False',
    //         Roundabout: 'False',
    //         Station: 'False',
    //         Stop: 'False',
    //         Traffic_Calming: 'False',
    //         Traffic_Signal: 'False',
    //         Turning_Loop: 'False',
    //         Sunrise_Sunset: 'Night',
    //         Civil_Twilight: 'Night',
    //         Nautical_Twilight: 'Night',
    //         Astronomical_Twilight: 'Night'
    // });

    //  dataModel
    //     .save()
    //     .then(result =>  {
    //         console.log(result);
    //     })
    //     .catch(err => console.log(err));
   // Process it and send a response

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
    var extensionName = String(path.extname(filePath)).toLowerCase();
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