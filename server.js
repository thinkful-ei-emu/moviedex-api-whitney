require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./moviedata.json');

const app = express();
app.use(morgan('common'));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);

//Endpoint should have general security, CORS & Helmet?
function validateBearerToken(req, res, next) {
  const API_TOKEN = process.env.API_TOKEN;
  const authToken = req.get('Authorization') || '';
  if(!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    return res.status(401).json({ error: 'Not authorized to make that request'});
  }

  next();
}

function handleGetMovie (req, res) {
  //Search options for genre, country, and/or avg_vote
  let results = movies;

  //Searching by genre -> whether movie's genre includes string, case insensitive
  if(req.query.genre) {
    results = results.filter(result => result.genre.toLowerCase().includes(req.query.genre.toLowerCase()));
  }
  //Searching by country -> whether the movie's country includes a specific string, case insensitive
  if(req.query.country) {
    results = results.filter(result => result.country.toLowerCase().includes(req.query.country.toLowerCase()));
  }
  //Searching by average vote -> whether movie's avg_vote is >= # supplied
  if(req.query.avg_vote) {
    results = results.filter(result => Number(result.avg_vote) >= Number(req.query.avg_vote));
  }
  //Api responds with array of full movie entries for search results
  return res.json(results);

}
//Endpoint is GET /movie
app.get('/movie', handleGetMovie);


app.listen(process.env.port, () => console.log(`Server listening at http://localhost:${process.env.port}`));