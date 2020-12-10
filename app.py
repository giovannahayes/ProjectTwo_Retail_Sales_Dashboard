# Import Dependencies
import numpy as np
from psycopg2 import connect, sql
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify
import datetime as dt
from flask import render_template
import json

# setup databases
engine = create_engine(
    "postgresql://postgres:Thegirls5!@localhost:5432/RetailDashboard2")
Base = automap_base()
Base.prepare(engine, reflect=True)
Train = Base.classes.Train
# Flask Setup
app = Flask(__name__)
session = Session(engine)

#setup routes
@app.route('/')
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br>"
        f"<a href='http://127.0.0.1:5000/api/v1.0/Trainjson'>/api/v1.0/Trainjson</a><br>"
        f"<a href='http://127.0.0.1:5000/api/v1.0/Dashboard'>/api/v1.0/Dashboard</a><br>"
    )
# json object routes
@app.route("/api/v1.0/Trainjson/")
@app.route("/api/v1.0/Trainjson/<year>/<month>")
@app.route("/api/v1.0/Trainjson/<year>")
def Trainjson(year=None, month=None):
    """Return all of our sales history"""
    # Query all history
    return_items = [
        Train.index,
        Train.Store,
        Train.Dept,
        Train.Date,
        Train.Weekly_Sales,
        Train.IsHoliday,
        Train.Cities_y,
        Train.States_y,
        Train.Latitude,
        Train.Longitude,
        Train.Month,
        Train.Year
    ]
    #control the items returned in the json based on user input
    if year and month:
        results = session.query(*return_items).\
            filter(Train.Year == int(year)).\
            filter(Train.Month == int(month)).all()
    elif year and not month:
        results = session.query(*return_items).\
            filter(Train.Year == int(year)).all()
    elif not year and month:
        results = session.query(*return_items).\
            filter(Train.Month == int(month)).all()
    else:
        results = []
        # Convert list of tuples into list and jsonify
    all_data = []
    for result in results:
        sales_dict = {}
        sales_dict["index"] = result[0]
        sales_dict["Store"] = result[1]
        sales_dict["Dept"] = result[2]
        sales_dict["Date"] = result[3]
        sales_dict["Weekly_Sales"] = result[4]
        sales_dict["IsHoliday"] = result[5]
        sales_dict["Cities_y"] = result[6]
        sales_dict["States_y"] = result[7]
        sales_dict["Latitude"] = result[8]
        sales_dict["Longitude"] = result[9]
        sales_dict["Month"] = result[10]
        sales_dict["Year"] = result[11]
        all_data.append(sales_dict)
    return jsonify(all_data)

#route where html housing dashboard will live
@app.route('/api/v1.0/Dashboard')
def showDashboard():
    return render_template('index.html')
if __name__ == "__main__":
    app.debug = True
    app.run()