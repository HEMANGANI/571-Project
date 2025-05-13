# COVID-19 Data Visualization 

## Overview

This submission contains an interactive COVID-19 dashboard developed as part of our data visualization project. The goal was to design and implement a web-based platform that allows users to explore various dimensions of the COVID-19 pandemic using multiple types of visualizations.

The dashboard enables insights into the global spread, severity, death and recovery rates, and regional variations through well-justified and interactive charts. All visualizations were implemented using D3.js, and data was preprocessed in Excel.

### What Is Included

**Our Code Includes:**

- D3.js scripts for all visualizations
- Custom JavaScript logic for interactivity, filtering, and state updates
- Tooltip and hover implementations
- Dropdown and slider controls
- HTML/CSS for layout and responsiveness

**External Libraries Used:**

- [D3.js](https://d3js.org/): For data-driven document manipulation and rendering
- [TopoJSON](https://github.com/topojson/topojson): For rendering world map boundaries
- Bootstrap: For layout and basic styling
- Google Fonts: For improved typography

### Project Links

- **Live Website:** [https://hemangani.github.io/571-Project/](https://hemangani.github.io/571-Project/)
- **Screencast Video:** [https://www.youtube.com/watch?v=cxhG2qFF9Ps](https://www.youtube.com/watch?v=cxhG2qFF9Ps)

## Non-Obvious Interface Features

- **Country Selection on World Map:**  
  In the Time Series Line Chart, users can click on a country from the choropleth map to add its data to the time series plot. This dynamic interaction allows comparison of multiple countries’ trends without navigating away from the map.

- **“Reset” Button:**  
  In the Time Series Line Chart, a “Reset” button clears selected countries from the chart, allowing the user to start a fresh comparison.

- **Interactive Date Slider:**  
  Present in both the bar chart and choropleth visualizations, the date slider lets users view trends across custom time ranges. It updates the view in real time and is linked to the filtered dataset.

- **Normalize by Population Option:**  
  In the Bar Chart view, a checkbox allows users to toggle between raw totals and per capita metrics. This helps avoid misleading comparisons between countries with vastly different populations.

- **Hover Tooltips:**  
  All charts include dynamic tooltips that reveal precise values (counts or percentages), enabling more detailed inspection without cluttering the interface.

- **Recovery Pie Chart Time Range Restriction:**  
  Due to corruption in the recovered dataset, recovery data is only available for a limited time period. As a result, the dropdowns in the Pie Chart are limited to years where valid recovery data is present.
