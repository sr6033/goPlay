var rp = require('request-promise');
var fetch = require('node-fetch');
var express = require('express');
var app = express();

const router = new express.Router();

router.get('/logout', (req, res) => {

  console.log(req.headers);
  app.get('/logout', function(req, res) {
  var url = 'http://auth.nonstop61.hasura-app.io/user/logout';
  var options = {
    method: 'POST',
    headers
  };
    
  fetch(url, options)
    .then(function(response) {
      console.log("> Logging out...");
      return response.json();
    })
    .then(function(data) {
      console.log(">\n> Logged Out.\n");
        res.send(data);
    });
  });
});