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
  //bar chart cities  
  let url = base_url
  let xl = []
  let yl = []
  Plotly.d3.json(url, function(figure){
    console.log(figure);
    let data = figure.data;
    console.log(data);
    for (var i=0; i< figure.length; i++){
      //console.log(figure[i]);
      xl.push(figure[i]["Cities_y"])
      yl.push(figure[i]["Weekly_Sales"]) }
      let trace = {
        x: xl,
        y: yl,
        type: 'bar',
        text: xl.map(String)
      }
  
    var layout = {
      title: 'Walmart Monthly Sales Volume by City ',
      xaxis: {
        title: 'Cities'
      },
      yaxis: {
        title: 'Revenue (in Millions)'
      }};
  
  Plotly.newPlot(document.getElementById('graph'), [trace], layout);
  
  //bubble chart dept
  let url = base_url
  let xl3 = []
  let yl3 = []
  // Plotly.d3.json(url, function(figure){
  //   console.log(figure);
  //   let data = figure.data;
  //   console.log(data);
    for (var z=0; z< figure.length; z++){
      //console.log(figure[i]);
      xl3.push(figure[z]["Dept"])
      yl3.push(figure[z]["Weekly_Sales"]) }
    
    
    var bubbs = [ {
  
      x: xl3,
      y:yl3,
      text: xl3.map(String),
      mode: 'markers',
      type: "scatter"
    }];
  
    var layout3 = {
      title: `id: ${monthYear[0]}/${monthYear[1]} Bacteria Bubble Chart`,
      xaxis:  { title:"Department"},
      yaxis:  { title:"Revenue (in Millions)"},
      // showlegend: false,
      hoverlabel:{
          bgcolor: "black",
          font: {color: 'white'}
      },
      margin: {
      t: 0,
      }
      ,margin: {
      t: 30,
      }
  // Render the plot to the div tag with id "bubble"
    };
  
  Plotly.newPlot(document.getElementById('bubble'), [bubbs], layout3);
  
  
  //line chart dates 
  let xl2 = []
  let yl2 = []
  // var dateData = {}
  // for(var i=0; i<xl2.length; i++ ) {
  //   if(!dateData.hasOwnProperty(xl2[i])) {
  //     dateData[xl2[i]] = 0;
  //   }
  //   dateData[xl2[i]] += yl2[i];
  // }
  
  // let x_vals = [];
  // let y_vals = [];
  // Object.keys(dateData).forEach(dt => {
  //   x_vals.push(dt);
  //   y_vals.push(dateData[dt]);
  // })
  
  Plotly.d3.json(url, function(figure){
    console.log(figure);
    let data = figure.data;
    console.log(data);
    for (var x=0; x< figure.length; x++){
      //console.log(figure[i]);
      xl2.push(figure[x]["Dates"])
      yl2.push(figure[x]["Weekly_Sales"])
    }  
    var moe = [{
        type: 'line',
        x: xl2,
        y: yl2,
        mode: 'line',
        transforms: [{
          type: 'aggregate',
          groups: xl2,
          aggregations: [
            { target: 'yl2', func: 'sum', enabled: true },
          ]
        }],
    }]
  
    var layout2 = {
      title: `id: ${monthYear[0]}/${monthYear[1]} Weekly Sales Chart`,
      xaxis:  { title:"Weeks"},
      yaxis:  { title:"Revenue (in Millions)"},
      // showlegend: false,
      hoverlabel:{
          bgcolor: "black",
          font: {color: 'white'}
      },
      margin: {
      t: 0,
      }
      ,margin: {
      t: 30,
      }
  // Render the plot to the div tag with id "bubble"
    };
    Plotly.newPlot('line', [moe], layout2)
  })
  
  // d3.json(base_url, function(figure){
  //   const data = figure.data;
  //   console.log(data);
  //   console.log('data2')
  //   const data2 = data.map((o) => ({
  //       Date: o["Date"],
  //       Weekly_Sales: o["Weekly_Sales"]
  //   }));
  //   console.log(data2);
  // });
  })
  })
  
  
  // let url = base_url
  
  //Plotly.plot(document.getElementById('line'), [trace2])]}}})})})
  // let trace2 = {
      //   x: xl2,
      //   y: yl2,
      //   transforms: [{
      //     type: 'aggregate',
      //     groups: yl2,
      //     aggregations: [
      //       {
      //         target: yl2,
      //         func: "sum",
      //         enabled: true
      //       }
      //     ]
      // },
      //zl2.push(figure[x]["Dept"])}
  
      // var layout2 = {
    //   title: 'Walmart Monthly Sales Volume by City ',
    //   xaxis: {
    //     title: 'Cities'
    //   },
    //   yaxis: {
    //     title: 'Revenue (in Millions)'
    //   }},
  