const jwt = require('jsonwebtoken');
var fetch = require('node-fetch');
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => { 
  res.status(200);
  return next();
  /*
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "Bearer token-value"
  const id = parseInt(req.headers.authorization.split(' ')[2]);
  const auth_token = req.headers.authorization.split(' ')[1];
  
  var headers = {'Content-Type': 'application/json'};
  headers.Authorization = 'Bearer ' + auth_token;
  headers['X-Hasura-User-Id'] = id;
  headers['X-Hasura-Role'] = 'user';

  //console.log(headers);

  var schemaFetchUrl = 'https://data.nonstop61.hasura-app.io/v1/query';
  var options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      type: 'select',
      args: {
        table: "game",
        columns: ['*']
    }})
  };

  return fetch(schemaFetchUrl, options)
          .then(
            (response) => {
              response.text()
                .then(
                  (data) => {
                    return next();
                  },
                  (e) => {
                    return res.status(401).end();
                  })
                .catch((e) => {
                  e.stack();
                  return res.status(401).end();
                });
            },
            (e) => {
              console.error(e);
              return res.status(401).end();
            })
          .catch((e) => {
            e.stackTrace();
            return res.status(401).end();
          });
        */
};