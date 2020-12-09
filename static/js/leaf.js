document.getElementById("dateInput").addEventListener("change", function() {
    var input = this.value;
    monthYear = input.split('-')
    //console.log(monthYear);
    //var base_url = `/api/v1.0/Trainjson/${monthYear[0]}/${monthYear[1]}`




mapboxgl.accessToken = 'pk.eyJ1IjoicGFmdW1pZyIsImEiOiJja2lncnhrbDcwMHhqMnFxcXYweXBsaTFuIn0.G6deejyMXzWPQ_ceL_5fuQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-95.75, 39.09],
zoom: 4
});
 
// var months = [
// 'January',
// 'February',
// 'March',
// 'April',
// 'May',
// 'June',
// 'July',
// 'August',
// 'September',
// 'October',
// 'November',
// 'December'
// ];

// function MapToMonth(banana){
//     var month = monthYear[1]

//     // switch(month){
//     //     case '01':
//     //         return 0
//     //     case '02':
//     //         return 1
//     //     case '03':
//     //         return 2
//     //     case '04':
//     //         return 3
//     //     case '05':
//     //         return 4
//     //     case '06':
//     //         return 5
//     //     case '07':
//     //         return 6
//     //     case '08':
//     //         return 7
//     //     case '09':
//     //         return 8
//     //     case '10':
//     //         return 9
//     //     case '11':
//     //         return 10
//     //     case '12':
//     //         return 11                                    
//     //     default:
//     //         return "N/A"
//     // }
// }

var month = monthYear[1]

console.log(month)
//the numbers rep colors...
// Function that will determine the color of a COUNTY based on the CORN Bushels
function MapToSales(Monthly_Sales) {
  if (Monthly_Sales < 5800000) {
      return 1;
  } else if (Monthly_Sales < 15000000) {
      return 2;
  }else if (Monthly_Sales < 23000000) {
      return 3;
  } else if (Monthly_Sales < 33000000) {
      return 4;
  } else if (Monthly_Sales < 58000000) {
      return 5;
  };
}

function filterBy(month) {
 
var filters = ['==', 'month', month];
map.setFilter('2010', filters);
map.setFilter('2011', filters);
map.setFilter('2012', filters);

 
// Set the label to the month
document.getElementById('Month').textContent = [month];
}


//starting to build the layers
//the line below loads all the layers 
map.on('load', function() {
 

$.getJSON('Resources_New/Walmart2010_Geojson.geojson', function(data) {

data.features = data.features.map(function(d) {
d.properties.month = (d.properties.Month)
d.properties.sales = MapToSales(d.properties.Monthly_Sales)
return d;
});
console.log(d.properties.Month)
map.addSource('sales2010', {
'type': 'geojson',
data: data
});

map.addLayer({
'id': '2010',
'type': 'fill',
'source': 'sales2010',
'layout': {},
'paint': {
'fill-color':[
'interpolate',
['linear'],
['get', 'Monthly_Sales'],
1, '#FFFF00',
2, '#FCD37F',
3, '#FFAA00',
4, '#E60000',
5, '#730000'

],
'fill-opacity': 0.3
}
});
// Set filter to first month of the year
// 0 = January
filterBy(1);

document.getElementById('slider').addEventListener('input', function(e) {
var month = parseInt(e.target.value, 10);
filterBy(month);
});

});

$.getJSON("Resources_New/Walmart2011Geojson.geojson", function(data) {

data.features = data.features.map(function(d) {
d.properties.month = MapToMonth(d.properties.Month)
d.properties.sales = MapToSales(d.properties.Monthly_Sales)
return d;
});
map.addSource('sales2011', {
'type': 'geojson',
data: data
});

map.addLayer({
'id': '2011',
'type': 'fill',
'source': 'sales2011',
'layout': {},
'paint': {
'fill-color':[
'interpolate',
['linear'],
['get', 'Monthly_Sales'],
1, '#FFFF00',
2, '#FCD37F',
3, '#FFAA00',
4, '#E60000',
5, '#730000'

],
'fill-opacity': 0.3
}
});
// Set filter to first month of the year
// 0 = January
filterBy(0);

document.getElementById('slider').addEventListener('input', function(e) {
var month = parseInt(e.target.value, 10);
filterBy(month);
});

});


$.getJSON("Resources_New/Walmart2012Geojson.geojson", function(data) {

    data.features = data.features.map(function(d) {
    d.properties.month = MapToMonth(d.properties.Month)
    d.properties.sales = MapToSales(d.properties.Monthly_Sales)
    return d;
});
map.addSource('sales2012', {
'type': 'geojson',
data: data
});
 
map.addLayer({
'id': '2012',
'type': 'fill',
'source': 'sales2012',
'layout': {},
'paint': {
'fill-color':[
'interpolate',
['linear'],
['get', 'Monthly_Sales'],
1, '#FFFF00',
2, '#FCD37F',
3, '#FFAA00',
4, '#E60000',
5, '#730000'

],
'fill-opacity': 0.3
}
});
// Set filter to first month of the year
// 0 = January
filterBy(0);
 
document.getElementById('slider').addEventListener('input', function(e) {
var month = parseInt(e.target.value, 10);
filterBy(month);
});

});


// var toggleableLayerIds = [ '2010', '2011', '2012' ];
 
// for (var i = 0; i < toggleableLayerIds.length; i++) {
// var id = toggleableLayerIds[i];
 
// var link = document.createElement('a');
// link.href = '#';
// link.className = 'active';
// link.textContent = id;
 
// link.onclick = function (e) {
// var clickedLayer = this.textContent;
// e.preventDefault();
// e.stopPropagation();
 
// var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
 
// if (visibility === 'visible') {
// map.setLayoutProperty(clickedLayer, 'visibility', 'none');
// this.className = '';
// } else {
// this.className = 'active';
// map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
// }
// };
 
// var layers = document.getElementById('menu');
// layers.appendChild(link);
// }
});})