const fs = require('fs');
const path = require('path');  
const qs = require('querystring');  
var model = require('../models/model')

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

function postHandler(request, response){

    //Find the file path
    let filePath = homeViewPath + request.url; 
    if (request.url == '/heatMap'){
        filePath = homeViewPath + '/heatMap.html';
    }  
    const dataModel= new homeModel({
        _id: mongoose.Types.ObjectId,
        ID:  request.body.ID, 
        Source: request.body.Source,
        TMC:   request.body.TMC,
        Severity: request.body.Severity,
        Start_Time: request.body.Start_Time,
        End_Time: request.body.End_Time,
        Start_Lat: request.body.Start_Lat,
        Start_Lng: request.body.Start_Lng,
        End_Lat: request.body.End_Lat,
        End_Lng: request.body.End_Lng,
        Distance: request.body.Distance,
        Description: request.body.Description,
        Number: request.body.Number,
        Street: request.body.Street,
        Side: request.body.Side,
        City: request.body.City,
        County: request.body.Country,
        State: request.body.State,
        Zipcode: request.body.Zipcode,
        Country: request.body.Country,
        TimeZone: request.body.TimeZone,
        Airport_code: request.body.Airport_code,
        Weather_Timestamp: request.body.Weather_Timestamp,
        Temperature: request.body.Temperature,
        Wind_Chill: request.body.Wind_Chill,
        Humidity: request.body.Humidity,
        Pressure: request.body.Pressure,
        Visibility: request.body.Visibility,
        Wind_Direction: request.body.Wind_Direction,
        Wind_Speed: request.body.Wind_Speed,
        Precipitation: request.body.Precipitation,
        Weather_Condition: request.body.Weather_Condition,
        Amenity: request.body.Amenity,
        Bump: request.body.Bump,
        Crossing: request.body.Crossing,
        Give_Way: request.body.Give_Way,
        Junction: request.body.Junction,
        No_Exit: request.body.No_Exit,
        Railway: request.body.Railway,
        Roundabout: request.body.Roundabout,
        Station: request.body.Station,
        Stop: request.body.Stop,
        Traffic_Calming: request.body.Traffic_Calming,
        Traffic_Signal: request.body.Traffic_Signal,
        Turning_Loop: request.body.Turning_Loop,
        Sunrise_Sunset: request.body.Sunrise_Sunset,
        Civil_Twilight: request.body.Civil_Twilight,
        Nautical_Twilight: request.body.Nautical_Twilight,
        Astronomical_Twilight: request.body.Astronomical_Twilight
    });

    //Used for getting the request data
    let reqBody = '';
    let formatedReqBody = '';  

    //Print any error
    request.on('error', (err) => { 
        console.error(err.stack);
    });

    //Get the data
    request.on('data',function(data){
        reqBody += data;  
        if (reqBody.length > 1e6)
            request.connection.destroy();
    });

    //Process it and send a response
    request.on('end', function(){ 
        formatedReqBody = qs.parse(reqBody);  
        model.find(reqBody);
        response.writeHead(200, { 'Content-Type': 'application/json' });
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