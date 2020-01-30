var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const enviroment = process.env.NODE_ENV || 'development'
const config = require("../../../knexfile")[enviroment]
const database = require("knex")(config)

router.get('/', function (req, res) {
  database('users').where('api_key', req.body.api_key)
    .first()
    .then(user => {
      if (user) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)
          .then(google_res => google_res.json())
          .then(google_res => res.status(200).json(google_res))
      } else {
        res.status(401).json({error: 'Unauthorized'});
      }
  }).catch(error => res.status(400).json({error: 'Bad request.'}))
})

module.exports = router;
// google_res.results[0].geometry.location.lat
