let downloadPNG = document.getElementById('downloadPNG');
let downloadCSV = document.getElementById('downloadCSV');
let downloadSVG = document.getElementById('downloadSVG');

downloadPNG.addEventListener('click', function() {
    //Get the map synced
    map.renderSync();

    //Create canvas
    let canvas = document.createElement('canvas');

    //Get drawing context of the canvas
    let context = canvas.getContext('2d');
        
/*  Simplified CODE FROM OPENLAYERS DOCUMENTAION https://openlayers.org/en/latest/examples/export-pdf.html?q=export    */
    canvas.width = map.getSize()[0];
    canvas.height = map.getSize()[1]; 
    Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
        context.drawImage(canvas, 0, 0); 
    });
/*  Simplified CODE FROM OPENLAYERS DOCUMENTAION https://openlayers.org/en/latest/examples/export-pdf.html?q=export    */ 
    
    downloadPNG.href = canvas.toDataURL();
});
 

downloadCSV.addEventListener('click', function() { 
    //Create collumns
    var content = 'longitude,latitude,description\n';

    //Add for each coord in array lon,lat + descArray for that coord
    for (var i = 0; i < coordArray.length; i++) {
        content += coordArray[i][0]+','+coordArray[i][1]+','+descArray[i]+'\n';
    }

    //Create new csv blob
    var csvFile = new Blob([content], { type: 'text/csv;charset=utf-8;'});
    downloadCSV.href = URL.createObjectURL(csvFile); 
});
 

downloadSVG.addEventListener('click', async function() { 
    //Get the map synced
    map.renderSync();

    //Create canvas
    let ctx = new C2S(map.getSize()[0], map.getSize()[1]); 

    //Do the same thing as "download png" to draw the canvas over context
    Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
        ctx.drawImage(canvas, 0, 0); 
    });

    //Create new svg blob
    var svgFile = new Blob([ctx.getSerializedSvg(true)], { type: 'text/svg;charset=utf-8;'});
    downloadSVG.href = URL.createObjectURL(svgFile); 
});

function showDownloadArea(){
    downloadArea = document.getElementById("DownloadArea");
    downloadArea.style.display= "inline";
}

function hideDownloadArea(){
    downloadArea = document.getElementById("DownloadArea");
    downloadArea.style.display= "none";
}