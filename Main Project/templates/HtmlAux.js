const fs = require('fs');  
const path = require('path'); 
const publicResources = path.join(__dirname, '..', 'public')

let topNav = ""
let footer = ""
let tool = ""

function readFile(name)
{
  var fileName = publicResources + '\\' + name + '.html'
  fs.readFile(fileName, 'utf8', function(error, content) 
  {    
    if (error){
      console.log(error)
      return
    }
    switch(name){
      case "topNav":
        topNav = content
        break
      case "footer":
        footer = content
        break
      case "tool":
        tool = content
        break
    }
  });  
}


function getTopNavHTML()
{
    var topNavHTML = `
            <link rel="stylesheet" href="topNav.css" type="text/css">
            <header class="Us-Accidents">
            <h1>US Accidents Visualizer</h1>
            <br>
            <div class="topnav">
              <a href="/">Home</a> 
              <a href="../heatMap">Heat Map</a>
              <a href="../pieChart">Pie chart</a>
              <a href="../barGraph">Bar Graph</a>
              <a>Sankey diagram</a>
              <a>Contacts</a>
            </div>
            </header>
          `
        return topNavHTML;
}



function getFooterHTML()
{
    var footerHTML = `
    <link rel="stylesheet" href="footer.css" type="text/css">
    <!-- code from https://codepen.io/Anurag-Chitnis/pen/jOEYpKL  -->
    <br><br><br><br><br><br>
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
        </div>
    <!-- code from https://codepen.io/Anurag-Chitnis/pen/jOEYpKL  -->
      `
      return footerHTML;
}



function getTool()
{ 
    var tool = `<div id="tool">
    <!-- This will be automatically generated via tool.js -->
    <select id="addSelect">
      <option value="0"> Choose searching criteria (or leave empty) </option>  
    </select>
    <!-- Form that sends all data to server -->
    <form id="form" onsubmit="return makeSearch()" > 
      <!-- Select/checkboxes/etc will be appended to this div -->
      <div id="searchBlockStart"></div>  
    <input type="submit"  value="search"/> 
    </form>
  </div>
  <script id="script2" type="text/javascript" src="tool.js"></script>
  `
  return tool
}


function transform(content)
{ 
  try{
    content = content.replace(/^(.*){topnav}(.*)/gm, topNav) 
    content = content.replace(/^(.*){footer}(.*)/gm, footer) 
    content = content.replace(/^(.*){tool}(.*)/gm, tool)  
  }
  catch(e){
    console.log(e);
  }
  return content
}

function start()
{
  readFile("topNav")
  readFile("footer")
  readFile("tool")
  console.log("all files were read!")
}

module.exports.transform = transform
module.exports.start = start