const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  movieId: String, // TMDB movieId
  name: String,
  year: Number,
});

module.exports = mongoose.model('Movie', schema);
