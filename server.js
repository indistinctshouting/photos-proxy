const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const BodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/fec');

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));

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


// const db = require('./../database/');

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use('/:id', express.static(__dirname + './../public/dist'));

app.get('/reviews/id/:id', (req, res) => {
  getRestaurantReviews(req.params.id, (reviews) => {
    res.send(reviews);
  });
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

module.exports.getRestaurantReviews = getRestaurantReviews;
