// TheMovieDB connector
// Documentation: https://developers.themoviedb.org/3

const buildUrl = (path, query = '') =>
  `https://api.themoviedb.org/3/${path}?api_key=${process.env.tmdbApiKey}&${query}`;

const getMovieUrl = movieId => buildUrl(`movie/${movieId}`);
const getSearchMovieUrl = terms => buildUrl('search/movie', `query=${terms}`);
const getImageUrl = (path, size = 'original') => `https://image.tmdb.org/t/p/${size}${path}`;

module.exports = { getMovieUrl, getSearchMovieUrl, getImageUrl };
