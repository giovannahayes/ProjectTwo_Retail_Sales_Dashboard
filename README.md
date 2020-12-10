# Project 2: Retail Sales Dashboard

## Group 2: Pooja Patel, Alicia Smith, Giovanna Hayes


## Objective
#### To create a dashboard for retail merchants to utlilize in order to gain insights easily so they can quickly take action and impact top line sales. The dashboard will allow merchants to compare sales by location, by category and by week within a given month. The timeframe to be analyze will be selected via user input

## Methodology:

### Data Sources
#### Extract a dataset that includes three csv files from Kaggle documenting retail sales from 45 Walmart locations


### Data Cleaning
#### Clean the csv files by removing duplicate entries, dropping unneeded columns, dropping any Nan records in data.
#### Cleaning included ensuring all units across columns were uniform, additional columns were added as necessary including the split of multiple records, namely dates and city/states. Also, additional columns were concatenated where appropriate in order to be used in the creation of the future database. 
#### Equally important, data was evaluated and outliers were questioned. We ensured the data was unbiased, noise was removed and erroneous values were excluded. 
We used Pandas to convert our cleaned data from data frames to csv files so that we may prepare to import data into our database. 

### Creating a Database
#### Using PostgreSQL, we create a database. 
#### We experienced some challenges identifying primary and foreign keys given the data did not have enough unique idenfiers. Once identified we were able create our own unique idenifiers and successfully move forwared with creating the database. We also learned best practices about how to select primary and foreign keys. 

### Creating a Flask and Web App
#### Using Flask, Javascript and HTML we created a web app to visualize the dashboard. Please find snapshots of our dashboard visualizations below:
#### We experienced some challenges but utilized resources available in the course to overcome these and create this app accessible via a local server.

![Image of bar](https://github.com/giovannahayes/ProjectTwo_Retail_Sales_Dashboard/blob/main/Images/bar.PNG)
![Image of dough](https://github.com/giovannahayes/ProjectTwo_Retail_Sales_Dashboard/blob/main/Images/doughnut.PNG)
![Image of line](https://github.com/giovannahayes/ProjectTwo_Retail_Sales_Dashboard/blob/main/Images/line.PNG)
