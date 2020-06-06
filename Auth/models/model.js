const mongoose = require('mongoose');
const qs = require('querystring');
const dbUrl = 'mongodb://cosminDBAdmin:20a4506524433eff9804e3b4eea35c64@centos-uni.zicar.info:27017/proiectTW_Cosmin?retryWrites=true&w=majority'
let db;

var Schema = mongoose.Schema;
var mySchema = new Schema({
    _id: mongoose.Types.ObjectId,
    user: String,
    password: String,
}, {
    versionKey: false
});

const MyModel = mongoose.model("users", mySchema, "users");

async function start() {
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log('Connected to DB!'))
        .catch(err => console.log('DB conn error: ${err.message}'));
    db = mongoose.connection;
}


function findByUser(user) {
    return new Promise((resolve, reject) => {
        try {
            MyModel.findOne({ "user": user })
                .exec((err, res) => {
                    if (err) console.log(err)
                    resolve(res)
                })
        }
        catch (error) {
            reject(error)
        }
    })
}
 

async function save(obj) {
    var model = new MyModel(obj);
    model.save((err, collection) => {
        if (err) return console.error(err);
        console.log(collection.name + " saved collection");
    });
}

module.exports.db = db;
module.exports.findByUser = findByUser;
module.exports.save = save;
module.exports.start = start;
