// This is the function for user input based on year and month selected
document.getElementById("dateInput").addEventListener("change", function() {
  var input = this.value;
  monthYear = input.split('-')
  console.log(monthYear);
  //Variable for local endpoint that houses our JSON object
  var base_url = `/api/v1.0/Trainjson/${monthYear[0]}/${monthYear[1]}`
  //buildChart(base_url);
  console.log(base_url)
  //Function to retrieve data from JSON object and storing in data
  d3.json(base_url).then( data => {
      console.log(data);
      if(data.length === 0){
          console.log("Hello World");
      }
  })
// Load data and build charts
// Creating empty lists to load the values from individaul keys from objects within the JSON
let url = base_url
let cities = []
let sales = []
let depts = []
let dates = []
let states = []
let states_valuesnew = []
//Function that allows us to push those individual values from keys into the emplty list created
Plotly.d3.json(url, function(figure){
  console.log(figure);
  let data = figure.data;
  console.log(data);
  for (var i=0; i< figure.length; i++){
    //console.log(figure[i]);
    cities.push(figure[i]["Cities_y"])
    sales.push(figure[i]["Weekly_Sales"])
    depts.push(figure[i]["Dept"])
    dates.push(figure[i]["Date"])
    states.push(figure[i]["States_y"])}
  //Variable below will house the list with the aggregated data for dates and weekly sales
    var dateData = {}
  for(var q=0; q<dates.length; q++ ) {
    if(!dateData.hasOwnProperty(dates[q])) {
      dateData[dates[q]] = 0;
    }
    dateData[dates[q]] += sales[q];
  }
  let x_vals = [];
  let y_vals = [];
  Object.keys(dateData).forEach(dt => {
    x_vals.push(dt);
    y_vals.push(dateData[dt]);
  })
 //Variable below will house the list with the aggregated data for dates and weekly sales
  var deptData = {}
  for(var v=0; v<depts.length; v++ ) {
    if(!deptData.hasOwnProperty(depts[v])) {
      deptData[depts[v]] = 0;
    }
    deptData[depts[v]] += sales[v];
  }
  let x_values = [];
  let y_values = [];
  Object.keys(deptData).forEach(dpt => {
    x_values.push(dpt);
    y_values.push(deptData[dpt]);
  })
  //Creating traces and layouts for plotly charts
  //Bar chart
  var trace = {
    x: cities,
    y: sales,
    type: 'bar',
    text: cities.map(String)
  }
  var layout = {
    title: `${monthYear[0]}/${monthYear[1]} Monthly Sales for Select Walmart Locations, By City`,
    xaxis: {
      title: 'Cities'
    },
    yaxis: {
      title: 'Revenue (in Millions)'
    }};
  //line chart
  var trace3 = {
    type: 'line',
    x: x_vals,
    y: y_vals,
    mode: 'line',
  }
  var layout3 = {
    title: `${monthYear[0]}/${monthYear[1]} Sales by Week`,
    xaxis:  { title:"Week Ending Date"},
    yaxis:  { title:"Revenue (in Millions)"},
  }
  // Used Charts JS to create the doughnut chart
  new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: x_values,
      datasets: [
        {
          label: "Revenue (in millions)",
          // backgroundColor: getRandomColor,
          backgroundColor: [ "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC", "#01FF70", "#85144B", "#F012BE", "#3D9970", "#111111", "#AAAAAA","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC", "#01FF70", "#85144B", "#F012BE", "#3D9970", "#111111", "#AAAAAA","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF",
          "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC", "#01FF70", "#85144B", "#F012BE", "#3D9970", "#111111", "#AAAAAA","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC", "#01FF70", "#85144B", "#F012BE", "#3D9970", "#111111", "#AAAAAA","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC", "#01FF70", "#85144B", "#F012BE", "#3D9970", "#111111", "#AAAAAA",
          "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC", "#01FF70", "#85144B", "#F012BE", "#3D9970", "#111111", "#AAAAAA","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001F3F", "#39CCCC"],
          data: y_values
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: `${monthYear[0]}/${monthYear[1]} Sales by Department`
      }
    }
  });
// Create charts
Plotly.newPlot(document.getElementById('graph'), [trace], layout),
Plotly.newPlot('line', [trace3], layout3)
});})