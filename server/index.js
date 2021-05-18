const express = require('express');
const path = require('path');
const db = require('./db');
const movies = require('./routes/movies');
const users = require('./routes/users');
require('dotenv').config(); // import .env and set global var process.env with it values

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../build'))); // this will load the final bundle of UI, get it with `npm run build`

app.use('/dom', express.static(path.join(__dirname, '../dom'))); // the dom version of ui

app.use(express.json()); // let us use request body as json

// Here add more routes
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api', (req, res) => res.status(404).send('API not found')); // show 404 if api is not defined above

// Our backend is simple: if it's an static file we serve it, if it starts with /api we call api router, else, this means this route doesn't exist or it's an UI route. In that case, we redirect to index.html so the user will end up with loading the UI
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  db.init();
});
