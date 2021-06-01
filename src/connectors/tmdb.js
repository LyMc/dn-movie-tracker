// TheMovieDB connector
// Documentation: https://developers.themoviedb.org/3

// Feel free to change it with your key
const API_KEY = 'd4a8045464e5c17496ef776ab07cea1a';

// Base URL for all TMDB API routes
const buildUrl = (path, query = '') =>
  `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&${query}`;

// Some API routes that are used in the app. These can be changed with your server routes that do the same
export const buildMovieUrl = movieId => buildUrl(`movie/${movieId}`);
export const buildSearchMovieUrl = terms => buildUrl('search/movie', `query=${terms}`);
export const buildImageUrl = (path, size = 'original') =>
  `https://image.tmdb.org/t/p/${size}${path}`;
export const imageFallback = 'https://popcornsg.s3.amazonaws.com/gallery/1576022757-covers.png';
