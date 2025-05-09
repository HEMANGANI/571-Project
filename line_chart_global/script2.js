const margin = { top: 50, right: 50, bottom: 50, left: 80 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select("svg")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const parseDate = d3.timeParse("%m/%d/%y");

d3.csv("../data/confirmed_global.csv").then(data => {
  // Get date columns
  const dateCols = data.columns.slice(3);

  // Transform from wide to long format
  const countryData = {};
  
  data.forEach(row => {
    const country = row["Country/Region"];
    countryData[country] = dateCols.map(date => ({
      date: parseDate(date),
      value: +row[date]
    }));
  });

  // Populate dropdown
  const select = d3.select("#country-select");
  select.selectAll("option")
    .data(Object.keys(countryData))
    .enter()
    .append("option")
    .text(d => d);

  // Scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height})`);
  
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .text("Date");
  const yAxis = svg.append("g");
  svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -60) // 60px to the left of the chart
  .text("Confirmed Cases");

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const selectedCountries = new Set();
  
  // const path = svg.append("path")
  //   .attr("fill", "none")
  //   .attr("stroke", "steelblue")
  //   .attr("stroke-width", 2);

  // function update(country) {
  //   const data = countryData[country];

  //   x.domain(d3.extent(data, d => d.date));
  //   y.domain([0, d3.max(data, d => d.value)]);

  //   xAxis.call(d3.axisBottom(x));
  //   yAxis.call(d3.axisLeft(y));

  //   path.datum(data).transition().duration(500).attr("d", line);
  // }
  
  function updateChart() {
    const allData = Array.from(selectedCountries).flatMap(c => countryData[c]);
    if (allData.length === 0) return;

    x.domain(d3.extent(allData, d => d.date));
    y.domain([0, d3.max(allData, d => d.value)]);

    xAxis.call(d3.axisBottom(x));
    yAxis.call(d3.axisLeft(y));

    const countries = Array.from(selectedCountries);

    const paths = svg.selectAll(".line").data(countries, d => d);

    paths.enter()
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", d => color(d))
      .attr("stroke-width", 2)
      .merge(paths)
      .transition().duration(500)
      .attr("d", d => line(countryData[d]));

    paths.exit().remove();
  }

//   // Initial plot
//   const defaultCountry = Object.keys(countryData)[0];
//   update(defaultCountry);

//   select.on("change", function () {
//     update(this.value);
//   });
// });
d3.select("#clear-chart").on("click", function () {
  selectedCountries.clear(); // Remove all countries
  svg.selectAll(".line").remove(); // Remove all paths
  d3.select("#legend").html("");

});

// d3.select("#add-country").on("click", function () {
//   const selected = select.property("value");
//   if (!selectedCountries.has(selected)) {
//     selectedCountries.add(selected);
//     updateChart();
//   }
// });

d3.select("#add-country").on("click", function () {
  const country = select.property("value");
  if (selectedCountries.has(country)) return;

  selectedCountries.add(country);
  const data = countryData[country];

  // Update scales
  x.domain(d3.extent(data, d => d.date));
  y.domain([0, d3.max([...selectedCountries].flatMap(c => countryData[c].map(d => d.value)))]);

  xAxis.call(d3.axisBottom(x));
  yAxis.call(d3.axisLeft(y));

  // Append path
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", color(country))
    .attr("stroke-width", 2)
    .attr("d", line);

  // Update legend
  updateLegend();
});
function updateLegend() {
  const legend = d3.select("#legend");
  legend.html(""); // Clear previous legend

  selectedCountries.forEach(country => {
    const item = legend.append("div").style("display", "flex").style("align-items", "center").style("margin-bottom", "4px");
    item.append("div")
      .style("width", "16px")
      .style("height", "16px")
      .style("margin-right", "8px")
      .style("background-color", color(country));
    item.append("span").text(country);
  });
}


// Optionally initialize with a default country
selectedCountries.add(Object.keys(countryData)[0]);
updateChart();
updateLegend();
});