// write your javascript code here.
// feel free to change the preset attributes as you see fit
let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

import * as d3 from "d3";
// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
  //shah.shaivals@northeastern.edu
  d3.csv("cars.csv", function(error, csv_data) {
    var data = d3.nest()
    .key(function(d) { return d.Origin;})
    .rollup(function(d) {
      return d3.sum(d, function(g) { return g.Horsepower;});
      console.log(csv_data);
    }).entries(csv_data)

  // set the ranges
//  var x = d3.scaleBand().range([0,width]);
//  var y = d3.scaleLinear().range([height, 0]);

  //scale the range of the data in the domains
  x.domain(csv_data.map(function(d) {return d.Origin;}));
  y.domain([0, d3.max(csv_data, function(d) {return d.Horsepower;})]);

  svg1.selectAll(".bar")
  .data(csv_data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.Origin);})
  .attr("width", x.bandWidth())
  .attr("y", function(d) { return y(d.Horsepower); })
  .attr("height", function(d) { return height - y(d.Horsepower); });

  svg1.append("g")
  .attr("transform", "translate(0, " + height + ")")
  .call(d3.axisBottom(x));

  svg1.append("g")
  .call(d3.axisLeft(y));});

  // second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
