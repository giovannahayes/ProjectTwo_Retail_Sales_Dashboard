document.getElementById("dateInput").addEventListener("change", function() {
  var input = this.value;
  monthYear = input.split('-')
  console.log(monthYear);
  var base_url = `/api/v1.0/Trainjson/${monthYear[0]}/${monthYear[1]}`
  //buildChart(base_url);
  console.log(base_url)
  d3.json(base_url).then( data => {
      console.log(data);
      if(data.length === 0){
          console.log("Hello World");
      }
  })

statelist = [['Alabama', 'AL'],
['Alaska', 'AK'],
['American Samoa', 'AS'],
['Arizona', 'AZ'],
['Arkansas', 'AR'],
['Armed Forces Americas', 'AA'],
['Armed Forces Europe', 'AE'],
['Armed Forces Pacific', 'AP'],
['California', 'CA'],
['Colorado', 'CO'],
['Connecticut', 'CT'],
['Delaware', 'DE'],
['District Of Columbia', 'DC'],
['Florida', 'FL'],
['Georgia', 'GA'],
['Guam', 'GU'],
['Hawaii', 'HI'],
['Idaho', 'ID'],
['Illinois', 'IL'],
['Indiana', 'IN'],
['Iowa', 'IA'],
['Kansas', 'KS'],
['Kentucky', 'KY'],
['Louisiana', 'LA'],
['Maine', 'ME'],
['Marshall Islands', 'MH'],
['Maryland', 'MD'],
['Massachusetts', 'MA'],
['Michigan', 'MI'],
['Minnesota', 'MN'],
['Mississippi', 'MS'],
['Missouri', 'MO'],
['Montana', 'MT'],
['Nebraska', 'NE'],
['Nevada', 'NV'],
['New Hampshire', 'NH'],
['New Jersey', 'NJ'],
['New Mexico', 'NM'],
['New York', 'NY'],
['North Carolina', 'NC'],
['North Dakota', 'ND'],
['Northern Mariana Islands', 'NP'],
['Ohio', 'OH'],
['Oklahoma', 'OK'],
['Oregon', 'OR'],
['Pennsylvania', 'PA'],
['Puerto Rico', 'PR'],
['Rhode Island', 'RI'],
['South Carolina', 'SC'],
['South Dakota', 'SD'],
['Tennessee', 'TN'],
['Texas', 'TX'],
['US Virgin Islands', 'VI'],
['Utah', 'UT'],
['Vermont', 'VT'],
['Virginia', 'VA'],
['Washington', 'WA'],
['West Virginia', 'WV'],
['Wisconsin', 'WI'],
['Wyoming', 'WY']]

chlorabbrv = ['AZ', 
'AL', 
'AK', 
'AR', 
'CA', 
'CO', 
'CT', 
'DC', 
'DE', 
'FL', 
'GA', 
'HI', 
'ID', 
'IL', 
'IN', 
'IA', 
'KS', 
'KY', 
'LA', 
'ME', 
'MD', 
'MA', 
'MI', 
'MN', 
'MS', 
'MO', 
'MT', 
'NE', 
'NV', 
'NH', 
'NJ', 
'NM', 
'NY', 
'NC', 
'ND', 
'OH', 
'OK', 
'OR', 
'PA', 
'RI', 
'SC', 
'SD', 
'TN', 
'TX', 
'UT', 
'VT', 
'VA', 
'WA', 
'WV', 
'WI', 
'WY', 
'AS', 
'GU', 
'MP', 
'PR', 
'VI', 
'UM']

// console.log(chlorabbrv)

  //build the charts 
//gather the data
let url = base_url
let cities = []
let sales = []
let depts = []
let dates = []
let states = []
let states_valuesnew = []

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

  var stateData = {}
  for(var r=0; r<states.length; r++ ) {
    if(!stateData.hasOwnProperty(states[r])) {
      stateData[states[r]] = 0;
    }
    stateData[states[r]] += sales[r];
  }
  let newlist =[];
  let state_values = [];
  let sales_values = [];
  var str =  state_values;
  Object.keys(stateData).forEach(stt => {
    state_values.push(stt);
    sales_values.push(stateData[stt]);
  }) 
  for(var t=0; t<state_values.length; t++){
    //console.log(state_values[t])
    var apple = state_values[t];
    var newapple = apple
      .replace("Texas","TX")
      .replace("Georgia","GA")
      .replace("Kentucky","KY")
      .replace("California","CA")
      .replace("Minnesota","MN")
      .replace("Oklahoma","OK")
      .replace("Illinois","IL")
      .replace("New York","NY")
      .replace("Wisconsin","WI")
      .replace("Massachusetts","MA");
    orange = newapple.split(',');
    //p = append(newlist,orange[t]) 
    newlist.push(newapple); 
    //console.log(orange) 
  }    
    
    console.log(newlist)
    //console.log(str.split(newapple));
  
  //console.log(orange)
  // var apple = state_values.toString();
  // var newapple = apple.replace("Texas","TX");
  // console.log(newapple)
  // for(var t=0; t<state_values.length; t++ ){
  //   if(state_values[0] === "Texas"){
  //     str.toUpper("Texas", "TX");
  //   } 
  // }
 
  
  // }
  // console.log(state_values[0])
  // console.log(state_values)
  //console.log(sales_values)
  //console.log(stateabbrv));

  //build out the traces and layouts for the charts

  //bar chart - sales by city
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

  // bubble chart -sales by department 
  // var trace2 = {
  //   x: x_values,
  //   y: y_values,
  //   mode: 'markers',
  //   type: "scatter",
  //   marker: {
  //     size: [400, 600, 800, 1000],
  //     sizemode: 'area'
  //   }
  //   // marker: {
  //   //   color: x_values,
  //   //   colorscale: "Earth",
  //   //   size: y_values
  //   // }
  // }

  // var layout2 = {
  //   title: `${monthYear[0]}/${monthYear[1]} Bubble Chart`,
  //   xaxis:  { title:"Department"},
  //   yaxis:  { title:"Revenue (in Millions)"},
  //   // showlegend: false,
  //   hoverlabel:{
  //       bgcolor: "black",
  //       font: {color: 'white'}
  //   },
  //   margin: {
  //   t: 0,
  //   }
  //   ,margin: {
  //   t: 30,
  //   }
  // }

  // line chart - sales by week
  var trace3 = {
    type: 'line',
    x: x_vals,
    y: y_vals,
    mode: 'line',
    // transforms: [{
    //   type: 'aggregate',
    //   groups: dates,
    //   aggregations: [
    //     { target: 'sales', func: 'sum', enabled: true },
    //   ]
  // }]}
  }
  var layout3 = {
    title: `${monthYear[0]}/${monthYear[1]} Line Chart`,
    xaxis:  { title:"Week Ending Date"},
    yaxis:  { title:"Revenue (in Millions)"},
  }
  //chart.js pie chart
  new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: x_values,
      datasets: [
        {
          label: "Revenue (in millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
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
  
  var chlormap = [{
    type: "choroplethmapbox", name: "US states",
    locations: [newlist],
   z: [sales_values],
   geojson: 'C:/Users/Brian/Desktop/ProjectTwo_Retail_Sales_Dashboard/Resources_New/Walmart2010_Geojson.geojson',
   zmin: 25, zmax: 280, colorbar: {y: 0, yanchor: "bottom", title: {text: "US states", side: "right"}}}
    ];
   
   var layout = {mapbox: {style: "dark", center: {lon: -110, lat: 50}, zoom: 0.8}, width: 600, height: 400, margin: {t: 0, b: 0}};
   
   var config = {mapboxAccessToken: "pk.eyJ1IjoicGFmdW1pZyIsImEiOiJja2lncnhrbDcwMHhqMnFxcXYweXBsaTFuIn0.G6deejyMXzWPQ_ceL_5fuQ"};
   
Plotly.newPlot('chlor', chlormap, layout, config);
//plot the charts  
Plotly.newPlot(document.getElementById('graph'), [trace], layout),
// Plotly.newPlot(document.getElementById('bubble'), [trace2], layout2),
Plotly.newPlot('line', [trace3], layout3)
});})

