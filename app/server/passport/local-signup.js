var rp = require('request-promise');
var fetch = require('node-fetch');
var express = require('express');
var app = express();

const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, name, password, done) => {
  const userData = {
    email: req.body.email.trim(),
    password: password.trim(),
    name: name.trim()
  };

  var headers = {'Content-Type': 'application/json'};
  var url = 'https://auth.nonstop61.hasura-app.io/signup';
  var options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      "username": userData.name,
      "email": userData.email,
      "password": userData.password
    })
  };

  fetch(url, options)
    .then(function(response) {
      console.log("> Signing up...");
      return response.json();
    })
    .then(function(data) {
        console.log(">\n> Signed up.\n");
        headers.Authorization = 'Bearer ' + data.auth_token;
        headers['X-Hasura-Role'] = data.hasura_roles[0];
        headers['X-Hasura-User-Id'] = data.hasura_id;
        
        /////////////////////////////////////////////

        var id = parseInt(headers['X-Hasura-User-Id']);

        var options = {
            method: 'POST',
            uri: 'https://data.nonstop61.hasura-app.io/v1/query',
            headers,
            body: {
              "type":"insert",
              "args":{
                  "table":"user",
                  "objects":[
                      {"hasura_id": id, "name": userData.name}
                  ],
              }
            },
            json: true // Automatically stringifies the body to JSON
          };

          console.log(JSON.stringify(options.body));
          rp(options)
            .then(function (parsedBody) {
                console.log("Name Added.");
            })
            .catch(function (err) {
                console.log("Name adding failed in user table.");
            });

        return done(null);
    });

});