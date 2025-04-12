# COVID-19 Global Data Visualization

## Overview
This web application provides an interactive visualization of COVID-19 global data. It allows users to explore confirmed cases and deaths across countries, with options to normalize by population, filter by top countries, and select specific date ranges during the pandemic.

## Features
- Toggle between confirmed cases and death data
- Normalize data by population (per 100,000 people)
- Filter to view top 10, 20, 30 countries, or all countries
- Interactive date range slider to examine specific time periods
- Responsive bar chart with tooltips showing detailed information
- Animated transitions when updating chart data

## Demo
![COVID-19 Data Visualization Demo](screenshot.png)

## Requirements
The application runs entirely in the browser and requires:
- A modern web browser with JavaScript enabled
- Internet connection to load the external libraries

## External Libraries
This application uses the following CDN-hosted libraries:
- [D3.js](https://d3js.org/) (v7.8.5) - For data visualization
- [PapaParse](https://www.papaparse.com/) (v5.4.1) - For CSV parsing
- [noUiSlider](https://refreshless.com/nouislider/) (v15.7.1) - For the date range slider

## Data Files
The application expects the following CSV files in a `/data` directory:
1. `time_series_covid19_confirmed_global.csv` - Time series data for confirmed cases
2. `time_series_covid19_deaths_global.csv` - Time series data for deaths
3. `UID_ISO_FIPS_LookUp_Table.csv` - Contains population data for normalization

## Setup Instructions
1. Clone or download this repository
2. Ensure the data files are placed in a `/data` subdirectory
3. Open `bar_chart_country.html` in a web browser

## How to Use
1. Select "Confirmed Cases" or "Deaths" from the Data Type dropdown
2. Check "Normalize by Population" to view per capita data (per 100,000 people)
3. Choose how many countries to display using the Top Countries dropdown
4. Use the date range slider to focus on specific time periods
5. Hover over bars to see detailed information for each country

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Credits
- Data source: Johns Hopkins University CSSE