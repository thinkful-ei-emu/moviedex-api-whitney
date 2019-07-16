require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
app.use(validateBearerToken);
//Endpoint is GET /movie
//Search options for genre, country, and/or average vote
//Searching by genre -> whether movie's genre includes string, case insensitive
//Searching by country -> whether the movie's country includes a specific string, case insensitive
//Searching by average vote -> whether movie's avg_vote is >= # supplied
//Api responds with array of full movie entries for search results

//Endpoint only responds give a valid Authorization header with a Bearer API token value
//Endpoint should have general security, CORS & Helmet?
function validateBearerToken(req, res, next) {
  const API_TOKEN = process.env.API_TOKEN;
  const authVal = req.get('Authorization') || '';
  const [ authType, token ] = authVal.split(' ');
  if(authType.toLowerCase() !== 'bearer') {
    return res.status(401).json({ error: 'Not authorized to make that request'});
  }
  if(token !== API_TOKEN) {
    return res.status(401).json({ error: 'Not authorized to make that request'});
  }

  next();
}
const validSearch = ['genre', 'country', 'avg_vote'];

function handleGetSearch(req, res) {
  res.json(validSearch);
}
app.get('/movie', handleGetSearch);

app.listen(8000, () => console.log('Server Started 8000'));