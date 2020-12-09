// Load data from hours-of-tv-watched.csv
d3.json('/Trainjson').then(function(salesData) {

    console.log(salesData);
  
    // log a list of names
    var dept = salesData.map(data => data.dept);
    console.log("Dept", dept);
  
    // Cast each hours value in tvData as a number using the unary + operator
    salesData.forEach(function(data) {
      //data.weeklysales = +data.weeklysales;
      console.log("Dept:", data.dept);
      console.log("Weekly_Sales:", data.weeklysales);
    });
  }).catch(function(error) {
    console.log(error);
  });

//create bar chart
  // Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json('/Trainjson').then(function(salesData) {

  // Print the tvData
  console.log(salesData);

  // Cast the hours value to a number for each piece of tvData
  salesData.forEach(function(data) {
    data.weeklysales //= +data.weeklysales;
  });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / salesData.length;

  // @TODO
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(salesData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.hours * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.hours * scaleY);
}).catch(function(error) {
  console.log(error);
});


//graph3 file 
document.getElementById("dateInput").addEventListener("change", function() {
  var input = this.value;
  monthYear = input.split('-')
  console.log(monthYear);
  var base_url = `/api/v1.0/Trainjson/${monthYear[0]}/${monthYear[1]}`
  console.log(base_url)


  d3.json(base_url).then( data => {
      console.log(data);
      if(data.length === 0){
          console.log("Hello World")
      }

      salesData.forEach(function(data) {
        data.sales = +data.Weekly_Sales;
        data.departments = +data.Dept;
      });
  

      //create bar chart
      // set the dimensions and margins of the graph
      var margin = {top: 30, right: 30, bottom: 70, left: 60};
         // width = 460 - margin.left - margin.right,
         // height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select('.bar')
        .append("svg")
          .attr("width", width )//+ margin.left + margin.right)
          .attr("height", height) //+ margin.top + margin.bottom)
        //.append("g")
        //  .attr("transform",
        //        "translate(" + margin.left + "," + margin.top + ")");

      // Parse the Data
      //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
      //console.log(data)

      // X axis
      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.departments)//data.map(function(d) { return d.Dept; }))
        //.padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 13000])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Bars
      svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", data.departments)//function(d) { return x(d.Dept); })
          .attr("y", data.sales)//function(d) { return y(d.Weekly_Sales); })
          .attr("width", x.bandwidth())
          .attr("height", data.sales)//function(d) { return height - y(d.Weekly_Sales); })
          .attr("fill", "#69b3a2")
    })})

    ///new chart
    var svgWidth = 960;
    var svgHeight = 500;
    
    var margin = {
      top: 20,
      right: 40,
      bottom: 60,
      left: 100
    };
    
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select(".chart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Import Data
    //d3.csv("hairData.csv").then(function(hairData) {
    
        // Step 1: Parse Data/Cast as numbers
        // ==============================
        hairData.forEach(function(data) {
          data.hair_length = +data.Dept;
          data.num_hits = +data.Weekly_Sales;
        });
    
        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
          .domain([20, d3.max(hairData, d => d.hair_length)])
          .range([0, width]);
    
        var yLinearScale = d3.scaleLinear()
          .domain([0, d3.max(hairData, d => d.num_hits)])
          .range([height, 0]);
    
        // Step 3: Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);
    
        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(bottomAxis);
    
        chartGroup.append("g")
          .call(leftAxis);
    
        // Step 5: Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
        .data(hairData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.hair_length))
        .attr("cy", d => yLinearScale(d.num_hits))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5");
    
        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
          .attr("class", "tooltip")
          .offset([80, -60])
          .html(function(d) {
            return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
          });
    
        // Step 7: Create tooltip in the chart
        // ==============================
        chartGroup.call(toolTip);
    
        // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
        circlesGroup.on("click", function(data) {
          toolTip.show(data, this);
        })
          // onmouseout event
          .on("mouseout", function(data, index) {
            toolTip.hide(data);
          });
    
        // Create axes labels
        chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left + 40)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .attr("class", "axisText")
          .text("Number of Billboard 100 Hits");
    
        chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
          .attr("class", "axisText")
          .text("Hair Metal Band Hair Length (inches)");
      }).catch(function(error) {
        console.log(error);
      });

      //line chart days
// let url = base_url
// let xl = []
// let yl = []
// Plotly.d3.json(url, function(figure){
//   console.log(figure);
//   let data = figure.data;
//   console.log(data);
//   for (var i=0; i< figure.length; i++){
//     //console.log(figure[i]);
//     xl.push(figure[i]["Date"])
//     yl.push(figure[i]["Weekly_Sales"]) }
//     let trace = {
//       x: xl,
//       y: yl,
//     }
// Plotly.plot(document.getElementById('line'), [trace]);




   
// // )})
// // create a bar chart
// function buildChart(base_url) {
// // d3.json(url);
// d3.json(base_url).then(function(data) {
//   console.log(data);
// data.forEach(function(data) {
//   data.sales = +data.Weekly_Sales;
//   data.departments = +data.Dept;
// });
// // d3.json('/Trainjson').then(function(salesData) {
// //   console.log(salesData);
//   // log a list of names
//   var dept = data.map(data => data.Dept);
//   console.log("Dept", dept);
//   // Cast each hours value in tvData as a number using the unary + operator
//   data.forEach(function(data) {
//     //data.weeklysales = +data.weeklysales;
//     console.log("Dept:", data.Dept);
//     console.log("Weekly_Sales:", data.Weekly_Sales);
//   });
// }).catch(function(error) {
//   console.log(error);
// });
// //create bar chart
// // Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 660;
// // Define the chart's margins as an object
// var chartMargin = {
// top: 30,
// right: 30,
// bottom: 30,
// left: 30
// };
// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// // Select body, append SVG area to it, and set the dimensions
// var svg = d3
// .select("#bar")
// .append("svg")
// .attr("height", svgHeight)
// .attr("width", svgWidth);
// // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// // to the margins set in the "chartMargin" object.
// var chartGroup = svg.append("g")
// .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
// // Load data from hours-of-tv-watched.csv
// d3.json(url).then(function(salesData) {
// // Print the tvData
// console.log(salesData);
// // Cast the hours value to a number for each piece of tvData
// salesData.forEach(function(data) {
//   data.Weekly_Sales //= +data.weeklysales;
// });
// var barSpacing = 10; // desired space between each bar
// var scaleY = 10; // 10x scale on rect height
// // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
// var barWidth = (chartWidth - (barSpacing * (salesData.length - 1))) / salesData.length;
// // @TODO
// // Create code to build the bar chart using the Data.
// chartGroup.selectAll(".bar")
//   .data(data)
//   .enter()
//   .append("rect")
//   .classed("bar", true)
//   .attr("width", d => barWidth)
//   .attr("height", d => d.Dept * scaleY)
//   .attr("x", (d, i) => i * (barWidth + barSpacing))
//   .attr("y", d => chartHeight - d.Dept * scaleY);
// }).catch(function(error) {
// console.log(error);
// })}});





// This needs to be a function
// function demoBox(sample){
//   d3.json("samples.json").then((sampleData) => {
      
//       var data = sampleData;
  
  
//       // Create an array of names
//       // var names = data.names;
  
  
//       // Create an array of objects and push it to the globally available variables
//       var metadata = data.metadata;
//       var dataArrays= metadata.filter(samplesObj => samplesObj.id == sample);
//       var dataResult = dataArrays[0];
//       var PANEL = d3.select("#sample-metadata");
//       // metadata.forEach(obj => metadataObj.push(obj));
//       PANEL.html("");
  
//       // Create an array of objects and push it to the globally available variables
//       // var samples = data.samples;
//       // samples.forEach(obj => samplesObj.push(obj));
//       Object.entries(dataResult).forEach(([key, value])=>{
//           PANEL.append('h6').text(`${key}:${value}`);
//       })
//       buildMyguagecharts(dataResult.wfreq);
//   });
//   }
  
// function buildMycharts(sample){
//     d3.json(base_url).then((data) =>{
//         //var samples = data.samples;
//         //var filterArray = samples.filter(samplesObj => samplesObj.Dept == sample);
//         //var dataResults =  filterArray[0]
//         var dataResults =  data

//         var otuIds = dataResults.Dept;
//         var sampleVals = dataResults.Weekly_Sales;
//         //var otuLabels = dataResults.otu_labels;

//         var idResults = [];
//         otuIds.forEach(function (id,i){ 
//         var newObj = {};
//         newObj.otu_id = id;
//         newObj.sample_value = sampleVals[i];
//         //newObj.otu_label = otuLabels[i];
//         idResults.push(newObj);
    

//         // Sort the objects by sample_value and then slice the top ten
//         var sortedById = idResults.sort((a,b) => b.sample_value - a.sample_value);
//         var slicedTopTen = sortedById.slice(0,10);
//         var reversedTopTen = slicedTopTen.reverse();
        

//         //Top Ten Data
//         var trace1 = {
//             x: reversedTopTen.map(row => row.sample_value),
//             y: reversedTopTen.map(row => `OTU ${row.otu_id}`),
//             text: reversedTopTen.map(row => row.otu_label),
//             name: `id: ${id}`,
//             marker:{
//                 'color': reversedTopTen.map(row => row.otu_id),
//                 'colorscale': 'Portland'
//             },
//             type: "bar",
//             orientation: "h"
//         };

//         // data to be used for the plot
//         var chartData = [trace1];

//         // group bar mode to the layout
//         var layout = {
//             title: `id: ${id} Bacteria Presence`,
//             hoverlabel:{
//                 bgcolor: "black",
//                 font: {color: 'white'}
//             },
//             margin: {
//             l: 70,
//             r: 70,
//             t: 30,
//             b: 100
//             }
//         };

//         Plotly.newPlot("bar-plot", chartData, layout);
//         return reversedTopTen;

        
//         });
        
//     });
    

// }})


//var url='http://localhost:9090/api/test';

// d3.json(base_url, function(error, data) {
//   if (error) return console.warn(error);
//   var layout = {barmode: 'group'};
  
//  Plotly.newPlot("bar-plot", data.data, layout);
// });})
