var rp = require('request-promise');
var fetch = require('node-fetch');
var express = require('express');
var app = express();

const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    name: email.trim(),
    password: password.trim()
  };

  var headers = {'Content-Type': 'application/json'};
  var url = 'https://auth.nonstop61.hasura-app.io/login';
  var options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      "username": userData.name,
      "password": userData.password
    })
  };

  fetch(url, options)
    .then(function(response) {
      console.log("> Logging in...");
      return response.json();
    })
    .then(function(data) {
        if(data.hasura_id == undefined)
        {
          console.log(">\n> Wrong credentials.\n");
          const error = new Error('Incorrect username or password');
          error.name = 'IncorrectCredentialsError';
          return done(error);
        }
        else {
          console.log(data);
          //Auth.authenticateUser();
          console.log(">\n> Logged in.\n");
          headers.Authorization = 'Bearer ' + data.auth_token;
          //headers['X-Hasura-Role'] = data.hasura_roles[0];
          headers['X-Hasura-User-Id'] = data.hasura_id;

          const token = data.auth_token + ' ' + data.hasura_id.toString();

          const udata = {
            name: userData.name
          };
          return done(null, token, udata);
        }
  });
    

});