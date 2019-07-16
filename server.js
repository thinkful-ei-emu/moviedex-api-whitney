const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

//Endpoint is GET /movie
//Search options for genre, country, and/or average vote
//Searching by genre -> whether movie's genre includes string, case insensitive
//Searching by country -> whether the movie's country includes a specific string, case insensitive
//Searching by average vote -> whether movie's avg_vote is >= # supplied
//Api responds with array of full movie entries for search results

//Endpoint only responds give a valid Authorization header with a Bearer API token value
//Endpoint should have general security, CORS & Helmet?

app.get('/movie', (req, res) => {
});

app.listen(8000, () => console.log('Server Started 8000'));