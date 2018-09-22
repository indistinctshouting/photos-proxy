const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const axios = require('axios');
const reviewsURL = 'http://18.223.122.135:3002';
const photosURL = 'http://54.193.49.49';
const sidebarURL = 'http://yelp-sidebar.hv38tyz7mj.us-west-2.elasticbeanstalk.com';
const cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use('/:id', express.static(__dirname + './../public/dist'));
app.use('/:rest_id', express.static(__dirname + './../public/'));
app.use(bodyParser.urlencoded({ extended: true }));

//Reviews Server Info:
app.get('/reviews/id/:id', (req, res) => {
  res.redirect(reviewsURL + `/reviews/id/${req.params.id}`)
});

//Photos Server Info:
app.get('/photos/:rest_id', function(req, res) {
  res.redirect(photosURL + `/photos/${req.params.rest_id}`)
});

//Sidebar Server Info:
app.get('/summary/id/:id', function(req, res) {
  res.redirect(sidebarURL + `/summary/id/${req.params.id}`)
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
