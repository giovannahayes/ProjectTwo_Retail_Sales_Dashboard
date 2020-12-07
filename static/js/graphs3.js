document.getElementById("dateInput").addEventListener("change", function() {
  var input = this.value;
  monthYear = input.split('-')
  console.log(monthYear);
  var base_url = `/api/v1.0/Trainjson/${monthYear[0]}/${monthYear[1]}`
  buildChart(base_url);
  console.log(base_url)
  d3.json(base_url).then( data => {
      console.log(data);
      if(data.length === 0){
          console.log("Hello World");
      }
  }
   )
// )})
// create a bar chart
function buildChart(url) {
// d3.json(url);
d3.json(url).then(function(data) {
  console.log(data);
data.forEach(function(data) {
  data.sales = +data.Weekly_Sales;
  data.departments = +data.Dept;
});
// d3.json('/Trainjson').then(function(salesData) {
//   console.log(salesData);
  // log a list of names
  var dept = data.map(data => data.Dept);
  console.log("Dept", dept);
  // Cast each hours value in tvData as a number using the unary + operator
  data.forEach(function(data) {
    //data.weeklysales = +data.weeklysales;
    console.log("Dept:", data.Dept);
    console.log("Weekly_Sales:", data.Weekly_Sales);
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
.select("#bar")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
// Load data from hours-of-tv-watched.csv
d3.json(url).then(function(salesData) {
// Print the tvData
console.log(salesData);
// Cast the hours value to a number for each piece of tvData
salesData.forEach(function(data) {
  data.Weekly_Sales //= +data.weeklysales;
});
var barSpacing = 10; // desired space between each bar
var scaleY = 10; // 10x scale on rect height
// Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
var barWidth = (chartWidth - (barSpacing * (salesData.length - 1))) / salesData.length;
// @TODO
// Create code to build the bar chart using the Data.
chartGroup.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("width", d => barWidth)
  .attr("height", d => d.Dept * scaleY)
  .attr("x", (d, i) => i * (barWidth + barSpacing))
  .attr("y", d => chartHeight - d.Dept * scaleY);
}).catch(function(error) {
console.log(error);
})}});