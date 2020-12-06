document.getElementById("dateInput").addEventListener("change", function() {
    var input = this.value;
    monthYear = input.split('-')
    console.log(monthYear);
    var base_url = `/api/v1.0/Trainjson/${monthYear[0]}/${monthYear[1]}`
    console.log(base_url)
    d3.json(base_url).then( data => {
        console.log(data);
        if(data.length === 0){
            console.log("Hello World");
        }
    }
)})



// queue()
//     .defer(d3.json, "/Trainjson")
//     .await(makeGraphs);
// ​
// function makeGraphs(error, recordsJson) {
//     //Clean data
// 	var records = recordsJson;
// 	var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
	
// 	records.forEach(function(d) {
// 		d["timestamp"] = dateFormat.parse(d["timestamp"]);
// 		d["timestamp"].setMinutes(0);
// 		d["timestamp"].setSeconds(0);
// 		d["longitude"] = +d["Longitude"];
// 		d["latitude"] = +d["Latitude"];
// 	});
// ​
//     //Create a Crossfilter instance
// 	var retail = crossfilter(records);
// ​
// 	//Define Dimensions
// 	var dateDim = retail.dimension(function(d) { return d["timestamp"]; });
// 	var storeDim = retail.dimension(function(d) { return d["Store"]; });
// 	var departmentDim = retail.dimension(function(d) { return d["Dept"]; });
//     var weeklysalesDim = retail.dimension(function(d) { return d["Weekly_Sales"]; });
//     var isholidayDim = retail.dimension(function(d) { return d["IsHoliday"]; });
//     var citiesDim = retail.dimension(function(d) { return d["Cities_y"]; });
//     var statesDim = retail.dimension(function(d) { return d["States_y"]; });
//     var latitudeDim = retail.dimension(function(d) { return d["Latitude"]; });
//     var longitudeDim = retail.dimension(function(d) { return d["Longitude"]; });
//     var monthDim = retail.dimension(function(d) { return d["Month"]; });
//     var yearDim = retail.dimension(function(d) { return d["Year"]; });
//     var allDim = retail.dimension(function(d) {return d;});
    
//     //Group Data
// 	var numRecordsByDate = dateDim.group();
// 	var storeGroup = storeDim.group();
// 	var departmentGroup = departmentDim.group();
// 	var weeklysalesGroup = weeklysalesDim.group();
//     var isholidayGroup = isholidayDim.group();
//     var citiesGroup = citiesDim.group();
//     var statesGroup = statesDim.group();
//     var latitudeGroup = latitudeDim.group();
//     var longitudeGroup = longitudeDim.group();
//     var monthGroup = monthDim.group();
//     var yearGroup = yearDim.group();
//     var all = retail.groupAll();
// ​
//     //Define values (to be used in charts)
// 	var minDate = dateDim.bottom(1)[0]["timestamp"];
//     var maxDate = dateDim.top(1)[0]["timestamp"];
    
//     //Charts
//     var numberRecordsND = dc.numberDisplay("#number-records-nd");
// 	var timeChart = dc.barChart("#time-chart");
// 	var departmentChart = dc.rowChart("#gender-row-chart");
//     var locationChart = dc.rowChart("#location-row-chart");
    
//     numberRecordsND
// 		.formatNumber(d3.format("d"))
// 		.valueAccessor(function(d){return d; })
// 		.group(all);
// ​
// ​
// 	timeChart
// 		.width(650)
// 		.height(140)
// 		.margins({top: 10, right: 50, bottom: 20, left: 20})
// 		.dimension(dateDim)
// 		.group(numRecordsByDate)
// 		.transitionDuration(500)
// 		.x(d3.time.scale().domain([minDate, maxDate]))
// 		.elasticY(true)
// 		.yAxis().ticks(4);
// ​
// 	departmentChart
// 		.width(300)
// 		.height(310)
//         .dimension(departmentDim)
//         .group(departmentGroup)
//         .ordering(function(d) { return -d.value })
//         .colors(['#6baed6'])
//         .elasticX(true)
//         .xAxis().ticks(4);
// ​
//     locationChart
//     	.width(200)
// 		.height(510)
//         .dimension(citiesDim)
//         .group(citiesGroup)
//         .ordering(function(d) { return -d.value })
//         .colors(['#6baed6'])
//         .elasticX(true)
//         .labelOffsetY(10)
//         .xAxis().ticks(4);
// ​
//         var map = L.map('map');
// ​
//         var drawMap = function(){
    
//             map.setView([31.75, 110], 4);
//             mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
//             L.tileLayer(
//                 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                     attribution: '&copy; ' + mapLink + ' Contributors',
//                     maxZoom: 15,
//                 }).addTo(map);
    
//             //HeatMap
//             var geoData = [];
//             _.each(allDim.top(Infinity), function (d) {
//                 geoData.push([d["Latitude"], d["Longitude"], 1]);
//               });
//             var heat = L.heatLayer(geoData,{
//                 radius: 10,
//                 blur: 20, 
//                 maxZoom: 1,
//             }).addTo(map);
    
//         };
    
//         //Draw Map
//         drawMap();
    
//         //Update the heatmap if any dc chart get filtered
//         dcCharts = [timeChart, genderChart, ageSegmentChart, phoneBrandChart, locationChart];
    
//         _.each(dcCharts, function (dcChart) {
//             dcChart.on("filtered", function (chart, filter) {
//                 map.eachLayer(function (layer) {
//                     map.removeLayer(layer)
//                 }); 
//                 drawMap();
//             });
//         });
    
//         dc.renderAll();
    
//     };
