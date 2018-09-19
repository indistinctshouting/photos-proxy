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

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use('/:id', express.static(__dirname + './../public/dist'));
app.use('/:rest_id', express.static(__dirname + './../public/'));
app.use(bodyParser.urlencoded({ extended: true }));

//Reviews Server Info:
app.get('/reviews/id/:id', (req, res) => {
  axios.get(`http://localhost:3002/reviews/id/${req.params.id}`)
  .then(function (response) {
    res.send(response.data);
    // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
});

//Photos Server Info:
app.get('/photos/:rest_id', function(req, res) {
  axios.get(`http://localhost:3001/photos/${req.params.rest_id}`)
  .then(function (response) {
    res.send(response.data);
    // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
});

//Sidebar Server Info:
app.get('/summary/id/:id', function(req, res) {
  axios.get(`http://localhost:3003/summary/id/${req.params.id}`)
  .then(function (response) {
    res.send(response.data);
    // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
