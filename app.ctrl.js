const express = require('express');
const app = express();

const mustacheExpress = require('mustache-express');

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

const { getAllTrips, getTripById, tripsSortedByRegion } = require('./app.model.js');
