function getTopNavHTML()
{
    var topNavHTML = `<div class="topnav">
            <a href="/">Home</a> 
            <a href="../heatMap">Heat Map</a>
            <a href="../pieChart">Pie chart</a>
            <a>Bar Graph</a>
            <a>Sankey diagram</a>
            <a>Contacts</a>
          </div>`
        return topNavHTML;
}
//  code from https://codepen.io/Anurag-Chitnis/pen/jOEYpKL 
function getFooterHTML()
{
    var footerHTML = `<br><br><br><br><br><br>
    <div class="footer">
    <div id="button"></div>
      <div id="container">
        <div id="cont">
        <div class="footer_center">
            <h3>
              <a href="/">Contact</a>
            </h3>
        </div>
        </div>
      </div>`
      return footerHTML;
}
//  code from https://codepen.io/Anurag-Chitnis/pen/jOEYpKL


function getTool()
{ 
    var tool = `<div id="tool">
    <!-- This will be automatically generated via homeViewModeler.js -->
    <select id="addSelect">
      <option value="0"> Choose searching criteria (or leave empty) </option>  
    </select>
    <button  id="createBlock" onclick="createBlock()"> new </button>
    <!-- Form that sends all data to server -->
    <form id="form" onsubmit="return makeSearch()" > 
      <!-- Select/checkboxes/etc will be appended to this div -->
      <div id="searchBlockStart"></div>  
    <input type="submit"  value="search"/> 
    </form>
  </div>
  <script id="script2" type="text/javascript" src="heatMapViewModeler.js"></script>
  `
  return tool
}

function getMapContaioner()
{
    var map = `<div id="mapContainer">  
    <!-- Upper button -->
    <button class="button arrowsUD" onmousedown="moveAround('up')" onmouseup="stopMove()"> &uarr; </button> 

    <div id="mapWrapper"> 
      <!-- Left button -->
      <button class="button arrowsLR"  onmousedown="moveAround('left')" onmouseup="stopMove()"> &larr; </button> 
      
      <!-- Map render using openlayers api -->
      <div id="map" class="map"></div>  

      <!-- Right button -->
      <button class="button arrowsLR"  onmousedown="moveAround('right')" onmouseup="stopMove()"> &rarr; </button> 
    </div> 

    <!-- Lower button -->
    <button class="button arrowsUD" onmousedown="moveAround('down')" onmouseup="stopMove()">  &darr; </button>  
    <script id="script1" type="text/javascript" src="homeMapRenderer.js"></script> 
  </div>`; 
  return map;
}


module.exports.getTopNavHTML = getTopNavHTML();
module.exports.getFooterHTML = getFooterHTML();
module.exports.getMapContaioner = getMapContaioner();
module.exports.getTool = getTool();
