const mongoose = require('mongoose');
const qs = require('querystring'); 
const dbUrl = 'mongodb+srv://admin:proiectTW2020@cluster0-3dd1j.gcp.mongodb.net/Users?retryWrites=true&w=majority';
let db;

var Schema = mongoose.Schema;
var mySchema = new Schema({
    user: String,
    password: String,
}, {
    versionKey: false
});
const MyModel = mongoose.model("user", mySchema, "user");

async function start(){
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log('DB conn error: ${err.message}')); 
    db = mongoose.connection;  
}
 

async function save(obj)
{
   var abc = new MyModel(obj);
   abc.save( (err, collection)  => {
    if (err) return console.error(err);
    console.log(collection.name + " saved collection");
  });
}


module.exports = mongoose.model("user", mySchema, "user");
module.exports.db = db;
module.exports.save = save;
module.exports.start = start;
