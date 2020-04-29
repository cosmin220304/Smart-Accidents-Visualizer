
const mongoose = require('mongoose');
const qs = require('querystring'); 
const dbUrl = 'mongodb://localhost/sav';
let db;

var Schema = mongoose.Schema;
var mySchema = new Schema({
    _id: String,
    ID:  String, 
    Source: String,
    TMC:   Number,
    Severity: String,
    Start_Time: Date,
    End_Time: Date,
    Start_Lat: Number,
    Start_Lng: Number,
    End_Lat: String,
    End_Lng: String,
    Distance: Number,
    Description: String,
    Number: Number,
    Street: String,
    Side: String,
    City: String,
    County: String,
    State: String,
    Zipcode: Number,
    Country: String,
    TimeZone: String,
    Airport_code: String,
    Weather_Timestamp: Date,
    Temperature: String,
    Wind_Chill: String,
    Humidity: Number,
    Pressure: Number,
    Visibility: Number,
    Wind_Direction: String,
    Wind_Speed: Number,
    Precipitation: Number,
    Weather_Condition: String,
    Amenity: Boolean,
    Bump: Boolean,
    Crossing: Boolean,
    Give_Way: Boolean,
    Junction: Boolean,
    No_Exit: Boolean,
    Railway: Boolean,
    Roundabout: Boolean,
    Station: Boolean,
    Stop: Boolean,
    Traffic_Calming: Boolean,
    Traffic_Signal: Boolean,
    Turning_Loop: String,
    Sunrise_Sunset: String,
    Civil_Twilight: String,
    Nautical_Twilight: String,
    Astronomical_Twilight: String
}); 
const MyModel = mongoose.model("data", mySchema, "data");

async function start(){
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log('DB conn error: ${err.message}')); 
    db = mongoose.connection;  
}
 
let i = 0;
async function find (body)
{
    console.log(body);
    var formatedReqBody = qs.parse(body);  
    console.log(formatedReqBody); 
    var firstKey = Object.keys(formatedReqBody)[0];
    var value = formatedReqBody[firstKey]
    console.log(firstKey, value)
    var test = parseInt(value);
    var n = firstKey.toString();
    i++;
    console.log(i, n,test)
    MyModel.find({[n]: test}, function(err, doc){ if(err) throw err; console.log((doc)) })
}

module.exports.start = start;
module.exports.find = find;