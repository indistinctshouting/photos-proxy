const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use('/:id', express.static(__dirname + './../public/dist'));
app.use('/:rest_id', express.static(__dirname + './../public/'));
app.use(bodyParser.urlencoded({ extended: true }));

//Reviews Server Info:
mongoose.connect('mongodb://localhost/fec');

const reviewSchema = new mongoose.Schema({
  reviewId: Number,
  restaurantId: Number,
  rating: Number,
  date: Date,
  text: String,
  owner: {
    picture: String,
    name: String,
    location: String,
    friends: Number,
    reviewCount: Number,
    photos: Number,
    checkIns: Number,
    elite: Boolean
  },
  updated: Boolean,
  upvotes: {
    useful: Number,
    funny: Number,
    cool: Number
  }
});

const Review = mongoose.model('Review', reviewSchema);

const getRestaurantReviews = (id, callback) => {
  console.log(id);
  Review.find({restaurantId: id}, (err, reviews) => {
    callback(reviews);
  });
};

app.get('/reviews/id/:id', (req, res) => {
  getRestaurantReviews(req.params.id, (reviews) => {
    res.send(reviews);
  });
});

//Photos Server Info:
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'photos'
});

var getPhotos = function(restId, callback) {
  connection.query(`SELECT * FROM photos WHERE rest_id = ${restId}`, function (err, rows, fields) {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};

app.get('/photos/:rest_id', function(req, res) {
  getPhotos(req.params.rest_id, function(err, data) {
    if (err) {
      res.sendStatus(503);
    } else {
      res.send(data);
    }
  });
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

module.exports.getRestaurantReviews = getRestaurantReviews;
