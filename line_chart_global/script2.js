const margin = { top: 50, right: 50, bottom: 50, left: 80 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select("svg")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const parseDate = d3.timeParse("%m/%d/%y");

d3.csv("data/confirmed_global.csv").then(data => {
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

  const yAxis = svg.append("g");

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  const path = svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2);

  function update(country) {
    const data = countryData[country];

    x.domain(d3.extent(data, d => d.date));
    y.domain([0, d3.max(data, d => d.value)]);

    xAxis.call(d3.axisBottom(x));
    yAxis.call(d3.axisLeft(y));

    path.datum(data).transition().duration(500).attr("d", line);
  }

  // Initial plot
  const defaultCountry = Object.keys(countryData)[0];
  update(defaultCountry);

  select.on("change", function () {
    update(this.value);
  });
});