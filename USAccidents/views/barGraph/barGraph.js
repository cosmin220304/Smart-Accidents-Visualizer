var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart( ctx, {
  type: "horizontalBar",
  data: { 
    labels: [],
    datasets: [{
      label: '# of Accidents',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  },
  options: {
      // legend: {
      //   // display: true,
      //   labels: [{
      //     fontColor: "white",
      //     fontSize: 18
      // }],
      scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
        }]
    }
  }
});

function updateGraph(states, data){
    var colors = poolColors(states.length);
    // myChart = new Chart(ctx, {
    //     type: 'horizontalBar',
    //     data: {
    //         labels: states,
    //         datasets: [{
    //             label: '# of Accidents',
    //             // minBarLength: 0,
    //             data: data,
    //             backgroundColor: colors,
    //             borderColor: colors,
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //               ticks: {
    //                 beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });
    myChart.data.labels=states;
    myChart.data.datasets[0].data=data;
    myChart.data.datasets[0].backgroundColor=colors;
    myChart.data.datasets[0].borderColor=colors;
    myChart.update();
}

function dynamicColors() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

function poolColors(a) {
  var pool = [];
  for(i = 0; i < a; i++) {
      pool.push(dynamicColors());
  }
  return pool;
}

function makeSearch() { 
  //Copy each value from that searchBlock into queryString
  let queryString = "";
  var block = document.getElementById("searchBlockStart");
  for ( var i = 0; i < block.childNodes.length; i++ ) {
    //Get the elements from that block
    var e = block.childNodes[i];  
    
    //If checkbox we are interested in true/false value
    if (e.type == "checkbox")
    { 
        queryString = queryString + e.name + "=" + e.checked.toString().toUpperCase() + "&";
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
  test(queryString);
  return false;
} 

async function test(queryString){
    var json = await getReq(queryString);
    console.log(json);
    var states= [];
    var data = [];
    for(var i = 0; i< Object.keys(json).length; i++){
        states.push(json[Object.keys(json)[i]]._id);
        data.push(json[Object.keys(json)[i]].counter);
    }
    console.log(states);
    console.log(data);
    for(var i = 0; i < data.length-1;i++){
      for(var j = i+1; j< data.length;j++){
        if(data[i]<data[j]){
          [data[i], data[j]] = [data[j], data[i]];
          [states[i], states[j]] = [states[j], states[i]];
        }
      }
    }  
    console.log(states);
    console.log(data);
    updateGraph(states,data);
}

async function getReq(queryString) {
    return new Promise((resolve, reject) => {
      try {
          fetch("/barGraph?" + queryString, {
            method: 'GET',
            headers: {
              'Accept': 'application/json, */*',
              'Content-type': 'application/json'
            }, 
          })
          .then((res) => res.json())
          .then((data) => {resolve(data);} );
          
      }
      catch (error){
          reject(error);
      }
    });
  } 