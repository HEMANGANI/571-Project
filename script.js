// Configuration
const margin = {top: 40, right: 80, bottom: 60, left: 60};
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Initial data
let rawData = [];
let processedData = [];

// Load data
Promise.all([
    d3.csv("time_series_covid19_recovered_global.csv"),
    d3.csv("time_series_covid19_confirmed_global.csv"),
    d3.csv("time_series_covid19_deaths_global.csv")
]).then(function(files) {
    rawData = {
        recovered: files[0],
        confirmed: files[1],
        deaths: files[2]
    };
    
    // Set default selections
    d3.select("#country-select").selectAll("option")
        .property("selected", (d, i) => i < 3);
    
    updateChart();
});

// Update chart function
function updateChart() {
    // Get user selections
    const selectedCountries = Array.from(
        document.querySelectorAll("#country-select option:checked")
    ).map(opt => opt.value);
    
    const selectedMetric = d3.select("#metric-select").property("value");
    const selectedPeriod = d3.select("#period-select").property("value");
    
    // Process data based on selections
    processData(selectedCountries, selectedMetric, selectedPeriod);
    
    // Clear previous chart
    svg.selectAll("*").remove();
    
    // Create scales
    const x = d3.scaleBand()
        .domain(processedData.periods)
        .range([0, width])
        .padding(0.2);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(processedData.data, d => 
            d3.max(selectedCountries, country => d[country])
        ])
        .nice()
        .range([height, 0]);
    
    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
    
    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Add Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(selectedMetric === "recovered" ? "Recovered Cases" : 
              selectedMetric === "confirmed" ? "Confirmed Cases" : "Deaths");
    
    // Create grouped bars
    const barGroups = svg.selectAll(".bar-group")
        .data(processedData.data)
        .enter()
        .append("g")
        .attr("class", "bar-group")
        .attr("transform", d => `translate(${x(d.period)},0)`);
    
    // Add bars
    barGroups.selectAll(".bar")
        .data(d => selectedCountries.map(country => ({
            country: country,
            value: d[country],
            period: d.period
        })))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x.bandwidth() / selectedCountries.length * i)
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth() / selectedCountries.length - 2)
        .attr("height", d => height - y(d.value))
        .attr("fill", (d, i) => color(d.country))
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);
    
    // Add legend
    updateLegend(selectedCountries);
}

// Data processing function
function processData(countries, metric, periodType) {
    const metricData = rawData[metric];
    const periods = getPeriods(periodType);
    
    // Process each country
    const countryData = countries.map(country => {
        const countryEntry = metricData.find(d => d["Country/Region"] === country);
        if (!countryEntry) return null;
        
        return {
            country: country,
            data: periods.map(period => ({
                period: period.label,
                value: calculatePeriodTotal(countryEntry, period.start, period.end)
            }))
        };
    }).filter(Boolean);
    
    // Transform to chart-friendly format
    const chartData = periods.map(period => {
        const periodObj = { period: period.label };
        countryData.forEach(country => {
            const periodData = country.data.find(d => d.period === period.label);
            periodObj[country.country] = periodData ? periodData.value : 0;
        });
        return periodObj;
    });
    
    processedData = {
        data: chartData,
        periods: periods.map(p => p.label)
    };
}

// Helper function to get periods based on selection
function getPeriods(type) {
    if (type === "yearly") {
        return [
            { label: "2020", start: "1/22/20", end: "12/31/20" },
            { label: "2021", start: "1/1/21", end: "12/31/21" },
            { label: "2022", start: "1/1/22", end: "12/31/22" }
        ];
    } else if (type === "6months") {
        return [
            { label: "Jan-Jun 2020", start: "1/22/20", end: "6/30/20" },
            { label: "Jul-Dec 2020", start: "7/1/20", end: "12/31/20" },
            { label: "Jan-Jun 2021", start: "1/1/21", end: "6/30/21" },
            { label: "Jul-Dec 2021", start: "7/1/21", end: "12/31/21" },
            { label: "Jan-Jun 2022", start: "1/1/22", end: "6/30/22" },
            { label: "Jul-Dec 2022", start: "7/1/22", end: "12/31/22" }
        ];
    } else { // quarterly
        return [
            // Would add quarterly periods here
        ];
    }
}

// Calculate total for a period
function calculatePeriodTotal(countryData, startDate, endDate) {
    // Convert date strings to comparable format
    // Note: Actual implementation would need proper date parsing
    const dates = Object.keys(countryData)
        .filter(key => !["Country/Region", "Lat", "Long"].includes(key));
    
    const startIdx = dates.indexOf(startDate);
    const endIdx = dates.indexOf(endDate);
    
    if (startIdx === -1 || endIdx === -1) return 0;
    
    const startValue = +countryData[dates[startIdx]] || 0;
    const endValue = +countryData[dates[endIdx]] || 0;
    
    return endValue - startValue;
}

// Update legend
function updateLegend(countries) {
    const legend = d3.select("#legend").html("");
    
    countries.forEach((country, i) => {
        const item = legend.append("div")
            .attr("class", "legend-item")
            .style("color", color(country))
            .on("click", () => {
                // Toggle country visibility
                // Would implement this in a full version
            });
        
        item.append("span")
            .style("display", "inline-block")
            .style("width", "12px")
            .style("height", "12px")
            .style("background-color", color(country))
            .style("margin-right", "5px");
        
        item.append("text").text(country);
    });
}

// Tooltip functions
function showTooltip(event, d) {
    // Implement tooltip showing value
}

function hideTooltip() {
    // Hide tooltip
}

// Event listeners
d3.select("#update-btn").on("click", updateChart);