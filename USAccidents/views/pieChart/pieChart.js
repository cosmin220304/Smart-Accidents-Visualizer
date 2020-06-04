google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawRegionsMap);
//Used when submit button is pressed

function makeSearch() {
  //Copy each value from that searchBlock into queryString
  let queryString = "";
  var block = document.getElementById("searchBlockStart");
  for (var i = 0; i < block.childNodes.length; i++) {
    //Get the elements from that block
    var e = block.childNodes[i];

    //If checkbox we are interested in true/false value
    if (e.type == "checkbox")
    { 
        queryString = queryString + e.name + "=" + e.checked.toString().toUpperCase() + "&";
        continue;
    }

    //If is a remove button/div/span we skip it
    if (e.className == "removeButton" || e.value == undefined) {
      continue;
    }

    //If is text area/date that was uncompleted we simply ignore it (and show a message)
    if (e.value == "") {
      alert("empty data in " + e.name + " will not be sent to server!");
      continue;
    }

    //We get the name and values and add it to our query string
    queryString = queryString + e.name + "=" + e.value + "&";
  }
  qsToArr(queryString);
  return false;
}
async function qsToArr(queryString) {
  console.log(queryString);
  var dataJS = await getReq(queryString);
  var coordonatesObject = Object.values(dataJS);
  console.log(coordonatesObject);

  var statesValueArr = [];
  for (var i = 0; i < coordonatesObject.length; i++) {
    var stat = coordonatesObject[i]._id;;
    var valoare = coordonatesObject[i].counter;
    statesValueArr.push([stat, valoare])
  }
  drawRegionsMap(statesValueArr)
}
//Get data from db
async function getReq(queryString) {
  return new Promise((resolve, reject) => {
    try {
      fetch("/pieChart?" + queryString, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, */*',
          'Content-type': 'application/json'
        },
      })
        .then((res) => res.json())
        .then((data) => { console.log(data); resolve(data); });

    }
    catch (error) {
      reject(error);
    }
  });
}

function drawRegionsMap(statesValueArr) {
  var data = [
    ['State', 'Accidents'],
    ["States", 1],
    ["AZ",0],
    ["AL",0],
    ["AK",0],
    ["AR",0],
    ["CA",0],
    ["CO",0],
    ["CT",0],
    ["DC",0],
    ["DE",0],
    ["FL",0],
    ["GA",0],
    ["HI",0],
    ["ID",0],
    ["IL",0],
    ["IN",0],
    ["IA",0],
    ["KS",0],
    ["KY",0],
    ["LA",0],
    ["ME",0],
    ["MD",0],
    ["MA",0],
    ["MI",0],
    ["MN",0],
    ["MS",0],
    ["MO",0],
    ["MT",0],
    ["NE",0],
    ["NV",0],
    ["NH",0],
    ["NJ",0],
    ["NM",0],
    ["NY",0],
    ["NC",0],
    ["ND",0],
    ["OH",0],
    ["OK",0],
    ["OR",0],
    ["PA",0],
    ["RI",0],
    ["SC",0],
    ["SD",0],
    ["TN",0],
    ["TX",0],
    ["UT",0],
    ["VT",0],
    ["VA",0],
    ["WA",0],
    ["WV",0],
    ["WI",0],
    ["WY",0],
    ["AS",0],
    ["GU",0],
    ["MP",0],
    ["PR",0],
    ["VI",0],
    ["UM",0]
  ];
  if (statesValueArr != undefined) {
    var states = Object.values(statesValueArr);
    for (var i = 0; i < states.length; i++)
      for (var j = 0; j < data.length; j++) {
        if (data[j][0] == states[i][0])
          data[j][1] = states[i][1];
      }
  }

  document.getElementById("downloadCSV").onclick = function () {
    var csvFormattedDataTable = google.visualization.dataTableToCsv(google.visualization.arrayToDataTable(data));
    var encodedUri = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvFormattedDataTable);
    this.href = encodedUri;
    this.download = 'table-data.csv';
    this.target = '_blank';
  };
  options = {
    colorAxis: { colors: ['#FEFFD2', '#EFFF00', '#8B0000'] },
    region: 'US',
    displayMode: 'regions',
    resolution: 'provinces',
    backgroundColor: 'transparent',
    chartArea: {
      backgroundColor: 'transparent',
    }
  }
  chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  chart.draw(google.visualization.arrayToDataTable(data), options);
  window.onresize = function () {
    chart.draw(google.visualization.arrayToDataTable(data), options);
  }
}

function showDocument(_base64Url) {
  var downBtn = document.getElementById('download')
  var encodedUri = chart.getImageURI();
  downBtn.href = encodedUri;
  downBtn.download = 'img';
  downBtn.target = '_blank';
}

function downloadJPG() {
  showDocument(chart.getImageURI());
}

