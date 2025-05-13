# COVID-19 Global Data Visualization

## Overview

This project presents an interactive, web-based data visualization dashboard for exploring various dimensions of the COVID-19 pandemic. The platform allows users to analyze the spread, severity, recovery trends, and geographic patterns of the pandemic through a series of thoughtfully designed visualizations.

## Project Links

- Project Website: [https://hemangani.github.io/571-Project/](https://hemangani.github.io/571-Project/)
- Screencast Video: [https://www.youtube.com/watch?v=cxhG2qFF9Ps](https://www.youtube.com/watch?v=cxhG2qFF9Ps)

## Code and Libraries

### Our Code

- D3.js visualizations
- Interactive UI logic for selection, filtering, and rendering
- Tooltip and dynamic interactivity for charts and maps
- Implementation of:
  - Time Series Line Chart
  - Bar Charts
  - Choropleth Map
  - Pie Chart
  - Death Rate Dashboard

### External Libraries

- D3.js: For all visualizations
- TopoJSON: For world map rendering
- Bootstrap/CSS: For layout and styling
- MS Excel: Used for initial data preprocessing

## Visualizations Implemented

### 1. Time Series Line Chart (Country Comparison)

**Intent**: Track confirmed cases over time for selected countries.

**Functionality**:
- Country selection via world map
- Dynamic update on selection; "Reset" button to clear
- Distinct color lines for comparison

**Design Considerations**:
- Uses position along a common scale (y-axis) for trend accuracy
- Colors help differentiate multiple countries

### 2. Global Bar Chart (Confirmed Cases by Country)

**Intent**: Highlight top countries based on confirmed cases or deaths.

**Functionality**:
- Choose metric (Confirmed Cases or Deaths)
- View top N countries (e.g., Top 10, Top 20)
- Normalize by population
- Adjustable date range with slider

**Design Considerations**:
- Sorted vertical bars for readability
- Clear labeling of date range

### 3. Global Choropleth Map (Time Series)

**Intent**: Provide a spatial view of pandemic severity over time.

**Functionality**:
- Select metric (Confirmed Cases or Deaths)
- Animate data over time with slider
- Color intensity indicates value

**Design Considerations**:
- Geographic encoding allows intuitive interpretation
- Uses standard choropleth color scales

### 4. Death Rate Dashboard (Bar Chart)

**Intent**: Identify countries with the highest death rates relative to total cases.

**Functionality**:
- Filter by year and minimum case threshold
- Sort in ascending or descending order

**Design Considerations**:
- Accurate length encoding for comparison
- Tooltips show exact percentages and totals

### 5. Recovery vs. Death Pie Chart

**Intent**: Compare recoveries and deaths as parts of a whole.

**Functionality**:
- Select a country and year
- View proportional segments of recoveries vs. deaths

**Design Considerations**:
- Hover tooltips show precise percentage values
- Simple and intuitive visual

**Note**: The recovered dataset is slightly corrupted and only available for a specific period. Recovery-related visualizations are restricted to that time range.

### 6. 6-Month Comparative Bar Chart

**Intent**: Show how COVID-19 metrics evolved across major 6-month phases.

**Functionality**:
- Select country and metric (Confirmed Cases or Deaths)
- View side-by-side bar comparisons

**Design Considerations**:
- Hovering reveals exact case numbers
- Facilitates comparison across defined periods

## Visualizations Considered but Not Implemented

### Clustered Column Chart with All Three Metrics

- Not implemented to reduce visual clutter and maintain clarity
- Simplified charts align with the principle of maximizing data-ink ratio

### Death vs. Recovery Rate Stacked Bar Chart

- Replaced with a pie chart and bar chart for better precision and interpretability

## Evaluation and Insights

The dashboard revealed multiple valuable insights:

- **Temporal Spread**: Line charts showed how countries experienced peaks at different times. For example, Ireland had wave-like patterns, while Afghanistan’s pattern was more erratic.
- **Geographic Impact**: The choropleth map illustrated persistent hotspots like the US, India, and Brazil, while some smaller nations showed high impact relative to population.
- **Death Trends**: The death rate dashboard highlighted how some countries improved significantly from one year to the next.
- **Comparative Patterns**: Bar charts and time series visualizations revealed spikes correlated with new variants and changes in lockdown policies, especially in late 2020.

## Notes and Known Limitations

- The recovered data file is partially corrupted and available only for a limited period. Recovery-based visualizations are therefore limited to that timeframe.
- Preprocessing was done manually in MS Excel to ensure alignment and consistency.

