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
    .catch(err => console.log('DB conn error:' + err)); 
    db = mongoose.connection;  
}
 

//This will be moved in homeModel
function findASD (body)
{  
    return new Promise((resolve, reject) => {
        try {
            MyModel.find(body).select("Start_Lat Start_Lng -_id").exec((err, res) => {resolve(res)}) 
        }
        catch (error){
            reject(error)
        }
    })
} 
function count (body)
{  
    return new Promise((resolve, reject) => {
        try {
            MyModel.aggregate
            ([
                {$match: body},
                {"$group": {_id:"$State",counter:{$sum:1}}}    
            ]).exec((err, res) => {resolve(res)}); 
        }
        catch (error){
            reject(error)
        }
    })
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
module.exports.findASD = findASD;
module.exports.count = count;
