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
    let changes = "" 
    let contentCopy = content
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
        
        //Get the pair name:[values]
        const pair = lines[i].split(" : ")
        const name = pair[0].replace(/(\s|\")/g, '')
        const values = pair[1].replace(/],/g, ']')

        //Get the values from db
        const dbValues = await getValuesByName(name)
         
        //Check if tool.js values and db values are the same
        if (! (values === dbValues) )
        {
            changes = changes + values + " -> " + dbValues + "\n"
            contentCopy = contentCopy.replace(values, dbValues)
        }
        i++
    }

    //Check if any changes was found and modify tool.js + create log file
    if (changes === ""){
        console.log("data observer finished, didn't find any changes")
    }
    else{
        repairChanges(contentCopy) 
        createLog(changes)
    }
}

function getValuesByName(name){
    return new Promise((resolve, reject) => {
        try {
            MyModel.findOne({Name : name}).select("Values -_id")
                    .exec((err, res) => {
                        if (err) console.log(err)
                        resolve(res.Values)
                    })
        }
        catch (error) {
            reject(error)
        }
    })
}

function repairChanges(content){
    const toolJs = path.join(__dirname, '..', 'public', 'tool.js')
    fs.writeFile(toolJs, content, function (err) {
        if (err) 
            console.log(err)
        else
            console.log("tool.js was modified. Data observer found values different from db values/")
    });
}

function createLog(content){
    const logsPath = path.join(__dirname, '..', 'logs and data')
    const logFile = logsPath + '\/data_observer.log'
    fs.writeFile(logFile, content, function (err) {
        if (err) 
            console.log(err)
        else
            console.log("check \"/logs and data/data_observer.log\" for log file with details")
    });
}

async function notify(data){
    //Get all the fields that were changed
    const names = Object.keys(data)
    for (var i = 0; i < names.length; i++){

        //Check if field is in bd 
        let exists = await nameExists(names[i])
        if (exists == true)
        {
            //Get values from db and compare
            let dbValues = await getValuesByName(names[i])
            let values = data[names[i]]

            //If values are different add to db
            if (!dbValues.includes(values))
            {
                addToDb(names[i], dbValues, values)
            }
        }
    }
}

function nameExists(name){
    return new Promise((resolve, reject) => {
        try {
            MyModel.findOne({Name : name})
                    .exec((err, res) => {
                        if (err) console.log(err)
                        if (res === null)
                            resolve(false)
                        else 
                            resolve(true)
                    })
        }
        catch (error) {
            reject(error)
        }
    })
}

function addToDb(name, dbValues, newValues){
    //Adds at the end in the string
    dbValues = dbValues.replace("]", ",\"" + newValues + "\"]")

    //Adds in db
    MyModel.updateOne(
        { Name: name },
        { $set: {Values : dbValues} },
        (err, result) => {
            if (err) console.log(err)
            console.log(result)
        }
    )
}

module.exports.start = start
module.exports.notify = notify;