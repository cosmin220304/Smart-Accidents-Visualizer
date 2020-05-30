var ctx = document.getElementById('myChart').getContext('2d');


function updateGraph(states, data){
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: states,
            datasets: [{
                label: '# of Votes',
                // minBarLength: 0,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
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
    updateGraph(states,data);
}

async function getReq(queryString) {
    return new Promise((resolve, reject) => {
      try {
          fetch("http://127.0.0.1:8128/barGraph?" + queryString, {
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