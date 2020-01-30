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
        console.log(user)
      } else {
        res.status(401).json({error: 'Bad credentials.'});
      }
  }).catch(error => console.log(error))
})

module.exports = router;
