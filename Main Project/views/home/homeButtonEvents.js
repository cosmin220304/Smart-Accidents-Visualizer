// Appends a new searchBlock to the last searchBlock
function createBlock(){
    //Get this element
    let createBlock = document.getElementById("createBlock");

    //Add color picker 
    let colorPicker = document.createElement("input"); 
    colorPicker.type = "color";
    colorPicker.name = "color";
    colorPicker.className = "colorPicker";

    //Replace createBlock button with color picker
    createBlock.parentNode.insertBefore(colorPicker, createBlock); 
    createBlock.remove();

    //When choosing color, color picker will create the actual search block and recreate the "createBlock" button
    colorPicker.onchange = function(){ 

        //Add the search block
        newSearchBlock = document.createElement("div");
        newSearchBlock.id = "searchBlock" + searchBlockNo;
        lastSearchBlock = searchBlocks[searchBlockNo]; 
        lastSearchBlock.parentNode.insertBefore(newSearchBlock, lastSearchBlock.nextSibling); 

        //Add to our array
        searchBlockNo += 1;
        searchBlocks.push(newSearchBlock);

        //Add the collor
        newSearchBlock.style.backgroundColor = colorPicker.value;

        //Add the "createBlock" button back
        let button = createBlock.cloneNode(true); 
        selectGenerator.parentNode.insertBefore(button, selectGenerator.nextSibling);

        //Remove color picker
        colorPicker.remove(); 
    }
}  


//Used when submit button is pressed
function makeSearch() { 
    //We make a different search for every searchBlock   
    for (var index = 0; index <= searchBlockNo; index++)
    {  
        //Get the block from searchBlocks list
        let block = searchBlocks[index]; 

        //If block is empty continue
        if (block.childNodes.length == 0)
        continue;

        //Copy each value from that searchBlock into queryString
        let queryString = "";
        for ( var i = 0; i < block.childNodes.length; i++ ) {
        //Get the elements from that block
        var e = block.childNodes[i];  

        //If checkbox we are interested in true/false value
        if (e.type == "checkbox")
        { 
            queryString = queryString + e.name + "=" + e.checked + "&";
            continue;
        }

        //If is a remove button/div/span we skip it
        if (e.className == "removeButton" || e.value == undefined)
        {
            continue;
        }

        //If is text area/date that was uncompleted we simply ignore it (and show a message)
        if (e.value == ""){
            alert("empty data in " + e.name + " will not be sent to server!");
            continue;
        }

        //We get the name and values and add it to our query string
        queryString = queryString + e.name + "=" + e.value + "&";
        } 
        //Add the color
        let color = "rgb(0, 0, 0)";
        if (searchBlocks[index].id != "searchBlockStart")
        color =  searchBlocks[index].style.backgroundColor; 

        //Print the result locally + send it to server
        console.log("For block number " + index + " we have: " + queryString);
        queryToPoints(queryString, color);
    }

    return false;
}  


async function queryToPoints(queryString, color){
    //Refresh the points on map
    removeAllPoints();
    //todo add loading

    //Get json from server
    var json = await getReq(queryString); 
    var coordonatesObject = Object.values(json);   

    console.log("got data from server");

    //Transform object into array of coordonates
    var coordonatesArray = [];
    var descriptionArray = [];
    for (var i = 0; i< coordonatesObject.length; i++){
        var lat = coordonatesObject[i].Start_Lat;
        var long = coordonatesObject[i].Start_Lng;  
        var desc = coordonatesObject[i].Description;
        descriptionArray.push(desc);
        coordonatesArray.push([long, lat]);
    } 

    //Add coordonates to map 
    addPointsToMap(coordonatesArray, descriptionArray, color);  
    console.log("queryToPoints finished");
}


//Get data from db
function getReq(queryString) {
    return new Promise((resolve, reject) => {
        try {
            fetch("http://127.0.0.1:8128/home?" + queryString, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, */*',
                'Content-type': 'application/json'
            }, 
            })
            .then((res) => res.json())
            .then((data) => resolve(data));
        }
        catch (error){
            reject(error);
        }
    });
} 