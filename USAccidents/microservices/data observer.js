const fs = require('fs');  
const path = require('path'); 
const mongoose = require('mongoose')
const dbUrl = 'mongodb://cosminDBAdmin:20a4506524433eff9804e3b4eea35c64@centos-uni.zicar.info:27017/proiectTW_Cosmin?retryWrites=true&w=majority'

var mySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Name: String,
    Types: String,
    Values: String 
})
const MyModel = mongoose.model("data_values", mySchema, "data_values")

//Gets the connection to server
async function start() {
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(readToolFile())
            .catch(err => console.log("data values observer failed at db connection: " + err))
}

//Reads the actual tool.js from this projects that dynamically generates collomns
async function readToolFile(){ 
    const toolJs = path.join(__dirname, '..', 'public', 'tool.js')
    fs.readFile(toolJs, 'utf8', function(err, content) 
    {     
      if (err){
        console.log("data values observer failed at read tool file" + err)
      }
      else {
        checkToolFile(content)
      }
    })
}

//Check if values are coresponding to the ones in database
async function checkToolFile(content){ 
    //Read each line from tool.js
    let lines = content.split(/\r\n|\n/)
    let i = 0
    while(1){
        //Stop when we see "//END"
        if (lines[i].includes("// END")){
            break
        }

        //Jump over useless rows
        if (lines[i].includes("const") || lines[i].includes("}")){
            i++
            continue
        }
        
        const pair = lines[i].split(" : ")
        const name = pair[0].replace(/(\s|\")/g, '');
        const values = pair[1].replace(/,/g, '')
        const dbValues = await getValuesByName(name)
        
        if (values != dbValues)
            console.log("it worked")
        else console.log("didnt work for " + name)
        // console.log(dbValues)
        i++
    }
}

function getValuesByName(name){
    return new Promise((resolve, reject) => {
        try {
            MyModel.findOne({Name : name}).select("Values -_id")
                    .exec((err, res) => {
                        if (err) console.log(err)
                        const ret = "\"" + res.Values + "\""
                        resolve(ret)
                    })
        }
        catch (error) {
            reject(error)
        }
    })
}

async function notify(data){
    console.log("MICROSERVICE ");
    console.log(JSON.stringify(data))
}

module.exports.start = start
module.exports.notify = notify;