# Pandemic Trends: A Visual Exploration of COVID-19 Data

## Project Overview
This project aims to develop interactive visualizations that provide insights into the spread and impact of COVID-19 across different regions and timeframes. Using data from the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE), we're creating a suite of visualizations to help understand pandemic dynamics.

GitHub Repository: [https://github.com/HEMANGANI/571-Project](https://github.com/HEMANGANI/571-Project)

## Team Members
- Hemangani Nagarajan (hemanganinag@umass.edu)
- Kavisha Parikh (kavishaprana@umass.edu)
- Varshini Venkataraman (vvenkatarama@umass.edu)

## Progress Update
We have completed the initial data processing phase and have developed three separate visualizations for our project milestone. During the data exploration phase, we discovered that the recovery dataset contained numerous missing values, making it unsuitable for reliable visualization. As a result, we decided to focus on the confirmed cases and deaths datasets for our analysis.

### Current Visualizations

#### 1. Country-wise Bar Chart Analysis (by Hemangani Nagarajan)
- Located in: `Visualization1_bar_chart/` folder
- Features:
  - Breakdown of COVID-19 cases by country
  - Analysis of different pandemic waves across regions
  - Interactive time interval selection
  - Comparative view of pandemic impact across countries

For details on implementation and usage, see the [Bar Chart Visualization README](Visualization1_bar_chart/README.md).

#### 2. US State-wise Time Series Analysis (by Varshini Venkataraman)
- Located in: `Visualization2_us_line_chart/` folder
- Features:
  - Line chart visualization of COVID-19 spread across US states
  - Time series analysis of cases and deaths
  - Interactive state selection and comparison
  - Trend analysis for individual states

For implementation details, refer to the [US Line Chart Visualization README](Visualization2_us_line_chart/README.md).

#### 3. Country-wise Time Series Analysis (by Kavisha Parikh)
- Located in: `Visualization3_global_line_chart/` folder
- Features:
  - Global time series data visualization by country
  - Interactive country selection for comparison
  - Pandemic progression analysis across different regions
  - Identification of key infection periods globally

For more information, check the [Global Line Chart Visualization README](Visualization3_global_line_chart/README.md).

## Dataset Notes
- We are using data from the JHU CSSE COVID-19 Dataset
- The dataset was last updated on March 10, 2023
- Original repositories: [https://github.com/CSSEGISandData/COVID-19.git](https://github.com/CSSEGISandData/COVID-19.git)
- **Important**: We have chosen to exclude the recovery dataset (`time_series_covid19_recovered_global.csv`) from our analysis due to significant data quality issues including inconsistent reporting and numerous missing values.

## Next Steps

1. **Integration**: Combine the three separate visualizations into a cohesive dashboard that allows users to interact with multiple views simultaneously.

2. **Additional Visualizations**: 
   - Implement the Global Choropleth Map to provide geographic context to the pandemic spread

3. **Enhanced Interactivity**:
   - Implement cross-filtering between visualizations

4. **Analysis and Insights**:
   - Document key findings from the visualizations
   - Identify patterns and anomalies in the COVID-19 spread
   - Compare pandemic waves across different regions

5. **Final Report and Documentation**:
   - Write a comprehensive project report
   - Document design decisions and implementation challenges
   - Create user guides for navigating the dashboard

## How to Run the Visualizations
Each visualization folder contains its own README with specific instructions on how to run and interact with the visualization. For the integrated dashboard (coming soon), instructions will be provided in the main directory.

## Technologies Used
- D3.js for creating interactive data visualizations
- JavaScript, HTML, and CSS for web implementation
- Python for data preprocessing

## Acknowledgments
Data provided by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).