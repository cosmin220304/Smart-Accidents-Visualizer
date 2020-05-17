const mongoose = require('mongoose');
const qs = require('querystring'); 
const dbUrl = 'mongodb+srv://admin:proiectTW2020@cluster0-3dd1j.gcp.mongodb.net/SAV?retryWrites=true&w=majority';
let db;

var Schema = mongoose.Schema;
var mySchema = new Schema({
    _id: mongoose.Types.ObjectId,
    ID:  String, 
    Source: String,
    TMC:   String,
    Severity: String,
    Start_Time: String,
    End_Time: String,
    Start_Lat: String,
    Start_Lng: String,
    End_Lat: String,
    End_Lng: String,
    Distance: String,
    Description: String,
    Number: String,
    Street: String,
    Side: String,
    City: String,
    County: String,
    State: String,
    Zipcode: String,
    Country: String,
    TimeZone: String,
    Airport_code: String,
    Weather_Timestamp: String,
    Temperature: String,
    Wind_Chill: String,
    Humidity: String,
    Pressure: String,
    Visibility: String,
    Wind_Direction: String,
    Wind_Speed: String,
    Precipitation: String,
    Weather_Condition: String,
    Amenity: String,
    Bump: String,
    Crossing: String,
    Give_Way: String,
    Junction: String,
    No_Exit: String,
    Railway: String,
    Roundabout: String,
    Station: String,
    Stop: String,
    Traffic_Calming: String,
    Traffic_Signal: String,
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
    var n = "" + firstKey;
    i++;
    console.log(i, n,test)
    MyModel.find({[n]: test}, function(err, doc){ if(err) throw err; console.log((doc)) })
}

function save(obj)
{
   var abc = new MyModel(obj);
   abc.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.name + " saved collection");
  });
}

module.exports = mongoose.model("data", mySchema);
module.exports.save = save;
module.exports.start = start;
module.exports.find = find;