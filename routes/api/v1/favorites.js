var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Forecast = require('../../../pojos/forecast')

const enviroment = process.env.NODE_ENV || 'development'
const config = require("../../../knexfile")[enviroment]
const database = require("knex")(config)

router.post('/', function (req, res) {
  database('users').where('api_key', req.body.api_key)
    .first()
    .then(user => {
      if (user) {
        database('favorites').insert({user_id: user.id, location: req.body.location}, 'id')
          .then(id => {
            res.status(201).json({success: `${req.body.location} favorite has been created.`})
          }).catch(error => console.log('DB insert error'))
      } else {
        res.status(401).json({error: 'Unauthorized'});
      }
  }).catch(error => res.status(400).json({error: 'Bad request.'}))
})

router.get('/', function (req, res) {
  database('users').where('api_key', req.body.api_key)
    .first()
    .then(user => {
      if (user) {
        database('favorites').where('user_id', user.id)
          .then(favorites => {
            let favorites_forecasts = favorites.map(favorite => {
              return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${favorite.location}&key=${process.env.GOOGLE_API_KEY}`)
                .then(google_res => google_res.json())
                .then(google_res => {
                  return fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${google_res.results[0].geometry.location.lat},${google_res.results[0].geometry.location.lng}`)
                    .then(darksky_res => darksky_res.json())
                    .then(darksky_res => new Forecast(favorite.location, darksky_res).favoriteForecast())
                })
              return favorite
            })
            Promise.all(favorites_forecasts)
              .then(favorites_res => res.status(200).json(favorites_res))
          })
      } else {
        res.status(401).json({error: 'Unauthorized'});
      }
  }).catch(error => res.status(400).json({error: 'Bad request.'}))
})

router.delete('/', function (req, res) {
  database('users').where('api_key', req.body.api_key)
    .first()
    .then(user => {
      if (user) {
        database('favorites')
          .where({
            user_id: user.id,
            location: req.body.location
          })
          .del()
          .then(id => {
            res.sendStatus(204)
          }).catch(error => res.status(400).json({error: 'Bad request.'}))
      } else {
        res.status(401).json({error: 'Unauthorized'});
      }
  }).catch(error => res.status(400).json({error: 'Bad request.'}))
})

module.exports = router;
