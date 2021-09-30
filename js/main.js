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

// first visualization

let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [-60, 20, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

  // Parsing the data
  d3.csv("data/covid.csv").then ( function(data) {

    // Adding the X axis
    const x = d3.scaleBand()
      .range([ 0, width])
      .domain(data.map(d => d.Country))
      .padding(0.5);
    svg1.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Adding the Y axis
    const y = d3.scaleLinear()
      .domain([0, 50000])
      .range([ height, 0]);
    svg1.append("g")
      .call(d3.axisLeft(y));

    // Bar Values
    svg1.selectAll("covid_chart")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", d => x(d.Country))
        .attr("y", d => y(d.Cases))
        .attr("width", x.bandwidth())
        .attr("height", d => height  - y(d.Cases))
        .attr("fill", "#ff0000")

    //adding the x label
    svg1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 50)
    .attr("y", height + 110)
    .text("40 Countries with The Highest Covid-19 Cases");

    //adding the y label
    svg1.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 10)
    .attr("x", -100)
    .attr("dy", "-2.8em")
    .attr("transform", "rotate(-90)")
    .text("Number of Covid Cases");

    //hover tool
    chart.bar()
         .data( data )
         .hover_in( function ( d, i, nodes ) {

             var bar = d3.select(this); // Alternatively, d3.select(nodes[i]);
             var label = d3.select(this.parentNode).selectAll('.label').data([d]);

             label.enter()
                 .append('text')
                 .attr('class', 'label')
                 .merge(label)
                 .text( d3.format('.1%')(d.Cases) )
                 .style('display', null)
                 .style('font', '10px sans-serif' )
                 .attr('text-anchor', 'middle')
                 .attr('x', +bar.attr('x') + ( +bar.attr('width') / 2 ))
                 .attr('y', +bar.attr('y') - 6 );


         })
        .hover( function () {
            var mouse = d3.mouse(this);
            var bar = d3.select(this);
            var line = d3.select(this.parentNode).selectAll('.line').data(['line']);
            line.enter()
                .append('line')
                .attr('class', 'line')
                .merge(line)
                .style('display', null)
                .style('stroke', 'black')
                .style('shape-rendering', 'crispEdges')
                .attr('pointer-events', 'none')
                .attr('x1', +bar.attr('x'))
                .attr('x2', +bar.attr('x') + ( +bar.attr('width') ))
                .attr('y1', mouse[1])
                .attr('y2', mouse[1]);
        })
        .hover_out( function () {

            d3.select(this.parentNode).select('.label')
                .style('display', 'none');

            d3.select(this.parentNode).select('.line')
                .style('display', 'none');

        });

    d3.select('#chart').call(chart);
  })

  // second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [-60, 20, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

  d3.csv("data/covid.csv").then(function(data) {

    // format the data
    data.forEach(function(d) {
        d.Country = d.Country;
        d.Cases = +d.Cases;
        d.Deaths = +d.Deaths;
    });

    // setting the values and formatting the x axis
    var x = d3.scaleBand()
    .range([ 0, width])
    .domain(data.map(d => d.Country))
    .padding(0.5);
    svg2.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
    var y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
    .x(function(d) { return x(d.Country); })
    .y(function(d) { return y(d.Cases); });

    // define the 2nd line
    var valueline2 = d3.line()
    .x(function(d) { return x(d.Country); })
    .y(function(d) { return y(d.Deaths); });

    // Scale the range of the data
    y.domain([0, d3.max(data, function(d) {
  	  return Math.max(d.Cases, d.Deaths) + 5000; })]);

    // Add the valueline path.
    svg2.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("fill","none")
        .attr("d", valueline);

    // Add the valueline2 path.
    svg2.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "black")
        .attr("fill","none")
        .attr("d", valueline2);


    // Add the Y Axis
    svg2.append("g")
        .call(d3.axisLeft(y));

        //adding the x label
        svg2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 110)
        .text("40 Countries with The Highest Covid-19 Cases and Deaths");
        //adding the y label
        svg2.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("x", -100)
        .attr("dy", "-2.8em")
        .attr("transform", "rotate(-90)")
        .text("Number of Cases or Deaths");
  });
