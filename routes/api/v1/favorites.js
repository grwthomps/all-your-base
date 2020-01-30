var express = require('express');
var router = express.Router();

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

module.exports = router;
