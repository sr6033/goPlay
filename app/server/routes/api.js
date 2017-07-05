const express = require('express');
var rp = require('request-promise');
const fetch = require('node-fetch');
const app = express();
const router = new express.Router();
var headers = {'Content-Type': 'application/json'};
var name = '';

/////////////////////
//// Dashboard  /////
/////////////////////

router.get('/dashboard', (req, res) => {
	
	headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
	//headers.Authorization = req.headers.authorization;
	headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
	headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];

	  var schemaFetchUrl = 'https://data.nonstop61.hasura-app.io/v1/query';
	  var options = {
	    method: 'POST',
	    headers,
	    body: JSON.stringify({
	      type: 'select',
	      args: {
	        "table": "game",
	        "columns": ['*', { 
	        	"name":"users", 
	        	"columns":["name"]
	        }],
	        "where": {
                "ongoing": {"$eq" : 0}
            },
	        "order_by": ["-game_id"]
	    }})
	  };

	  fetch(schemaFetchUrl, options)
	    .then(
	      (response) => {
	        response.text()
	          .then(
	            (data) => {
	            	res.status(200).send(data);
	            },
	            (e) => {
	              res.json('Error in fetching current schema: ' + err.toString());
	            })
	          .catch((e) => {
	            e.stack();
	            res.json('Error in fetching current schema: ' + e.toString());
	          });
	      },
	      (e) => {
	        console.error(e);
	        res.json('Error in fetching current schema: ' + e.toString());
	      })
	    .catch((e) => {
	      e.stackTrace();
	      res.json('Error in fetching current schema: ' + e.toString());
	    });
});

/////////////////////
//// Profile Page ///
/////////////////////

router.get('/profile', (req, res) => {
	
	headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
	//headers.Authorization = req.headers.authorization;
	headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
	headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];

	var id = parseInt(headers['X-Hasura-User-Id']);

	var schemaFetchUrl = 'https://data.nonstop61.hasura-app.io/v1/query';
	var options = {
	    method: 'POST',
	    headers,
	    body: JSON.stringify({
	      type: 'select',
	      args: {
	        "table": "game",
            "columns": ['*', { 
            	"name":"users", 
            	"columns":["name"]
            }],
            "where": {
                "captain_id": {"$eq" : id}
            },
            "order_by": ["-game_id"]
        }})
    };

	fetch(schemaFetchUrl, options)
	    .then(
	      (response) => {
	        response.text()
	          .then(
	            (data) => {
	            	res.status(200).send(data);
	            },
	            (e) => {
	              res.json('Error in fetching current schema: ' + err.toString());
	            })
	          .catch((e) => {
	            e.stack();
	            res.json('Error in fetching current schema: ' + e.toString());
	          });
	      },
	      (e) => {
	        console.error(e);
	        res.json('Error in fetching current schema: ' + e.toString());
	      })
	    .catch((e) => {
	      e.stackTrace();
	      res.json('Error in fetching current schema: ' + e.toString());
	    });
	  
});

/////////////////////
//// Start Game  ////
/////////////////////

router.post('/startgame', (req, res) => {

	var id = parseInt(headers['X-Hasura-User-Id']);
	//var id = 21;
	var game_id = parseInt(req.body.game_id);

	var options = {
	    method: 'POST',
	    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
	    headers,
	    body: {
	    	"type":"update",
		    "args":{
		        "table":"game",
		        "$set": {"ongoing": 1},
		        "where": {
		            "game_id": game_id
		        }
		    }
	    },
    	json: true // Automatically stringifies the body to JSON
  	};

  	console.log(JSON.stringify(options.body));
  	rp(options)
	    .then(function (parsedBody) {
	        console.log("Update succeeded.");
	        res.status(200).json({
			    message: "Update succeeded."
			});
	    })
	    .catch(function (err) {
	        console.log("Update failed.");
	        res.send(err);
    	});
});

/////////////////////
//// Ongoing Page ///
/////////////////////

router.get('/ongoing', (req, res) => {
	
	headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
	//headers.Authorization = req.headers.authorization;
	headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
	headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];

	  var schemaFetchUrl = 'https://data.nonstop61.hasura-app.io/v1/query';
	  var options = {
	    method: 'POST',
	    headers,
	    body: JSON.stringify({
	      "type": "select",
			"args": {
				"table": "game",
				"columns": ["*", {
					"name": "users",
					"columns": ["name"]
				}],
				"where": {
	                "ongoing": {"$eq" : 1}
	            },
				"order_by": ["-game_id"]
			}
		})
	  };

	  fetch(schemaFetchUrl, options)
	    .then(
	      (response) => {
	        response.text()
	          .then(
	            (data) => {
	            	res.status(200).send(data);
	            },
	            (e) => {
	              res.json('Error in fetching current schema: ' + err.toString());
	            })
	          .catch((e) => {
	            e.stack();
	            res.json('Error in fetching current schema: ' + e.toString());
	          });
	      },
	      (e) => {
	        console.error(e);
	        res.json('Error in fetching current schema: ' + e.toString());
	      })
	    .catch((e) => {
	      e.stackTrace();
	      res.json('Error in fetching current schema: ' + e.toString());
	    });
});

/////////////////////
//// Insert data ////
/////////////////////

router.post('/addgame', (req, res) => {

	var id = parseInt(headers['X-Hasura-User-Id']);
	//var id = 21;
	var title = req.body.title;
	var place = req.body.place;
	var contact = req.body.contact;
	var image = req.body.image;
	var description = req.body.description;
	var min_player = parseInt(req.body.min_player);

	var options = {
	    method: 'POST',
	    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
	    headers,
	    body: {
	    	"type":"insert",
		    "args":{
		        "table":"game",
		        "objects":[
		            {"captain_id": id, "title": title, "place": place, "contact": contact, 
		            "description": description, "min_player": min_player, "image": image,
		        	"counter": 0, "ongoing": 0}
		        ],
		        "returning": ["counter"]
		    }
	    },
    	json: true // Automatically stringifies the body to JSON
  	};

  	console.log(JSON.stringify(options.body));
  	rp(options)
	    .then(function (parsedBody) {
	        console.log("POST succeeded.");
	        res.status(200).json({
			    message: "POST succeeded."
			});
	    })
	    .catch(function (err) {
	        console.log("POST failed.");
	        res.send(err);
    	});
});

/////////////////////
//// Update data ////
/////////////////////


//////////////// Delete a game ///////////////////////////

router.post('/deletegame', (req, res) => {

	var id = parseInt(headers['X-Hasura-User-Id']);
	var game_id = parseInt(req.body.game_id);
	//var id = 21;

	var options = {
		method: 'POST',
		uri: 'https://data.nonstop61.hasura-app.io/v1/query',
		headers,
		body: {
			"type" : "delete",
			"args" : {
				"table" : "player",
				 "where": {
				    "game_id": game_id
				}
			}
		},
		json: true // Automatically stringifies the body to JSON
	};

	console.log(JSON.stringify(options.body));
	rp(options)
		.then(function (parsedBody) {
			console.log("Players deleted.");

			var options = {
			    method: 'POST',
			    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
			    headers,
			    body: {
			    	"type" : "delete",
				    "args" : {
				        "table" : "game",
				        "where": {
				           "game_id": game_id
				        }
				    }
			    },
		    	json: true // Automatically stringifies the body to JSON
		  	};

		  	rp(options)
			    .then(function (parsedBody) {
			        console.log("Game deleted."); 

			    })
			    .catch(function (err) {
			        console.log("Game delete failed.");
			        console.log(err);
			        res.send(err);
		    	});
				        
		})
		.catch(function (err) {
			console.log("Player delete failed.");
			res.send(err);
		});

});

///////////////Update Name////////////////////////////////

router.post('/edit', (req, res) => {

	var id = parseInt(headers['X-Hasura-User-Id']);
	//var id = 21;
	var name = req.body.name;

	var options = {
	    method: 'POST',
	    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
	    headers,
	    body: {
	    	"type":"update",
		    "args":{
		        "table":"user",
		        "$set": {"name": name},
		        "where": {
		            "hasura_id": id
		        }
		    }
	    },
    	json: true // Automatically stringifies the body to JSON
  	};

  	console.log(JSON.stringify(options.body));
  	rp(options)
	    .then(function (parsedBody) {
	        console.log("Name update succeeded.");
	        res.status(200).json({
			    message: "Name update succeeded."
			});
	    })
	    .catch(function (err) {
	        console.log("Name update failed.");
	        res.send(err);
    	});
});

////////////////// Increase counter ///////////////////////////

router.post('/inccounter', (req, res) => {

	var id = parseInt(headers['X-Hasura-User-Id']);
	//var id = 21;
	var game_id = parseInt(req.body.game_id);

// Inserting into player table

	var options = {
	    method: 'POST',
	    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
	    headers,
	    body: {
	    	"type":"insert",
		    "args":{
		        "table":"player",
		        "objects":[
		            {"hasura_id": id, "game_id": game_id}
		        ]
		    }
	    },
    	json: true // Automatically stringifies the body to JSON
  	};

  	console.log(JSON.stringify(options.body));
  	rp(options)
	    .then(function (parsedBody) {
	        console.log("POST succeeded.");
	        
	        // Updating counter

	        var options = {
		    method: 'POST',
		    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
		    headers,
		    body: {
		    	"type":"update",
			    "args":{
			        "table":"game",
					 "$inc": { "counter" : 1  },
			        "where": {
			            "game_id": game_id
			        }
			    }
			    },
		    	json: true // Automatically stringifies the body to JSON
		  	};

		  	console.log(JSON.stringify(options.body));
		  	rp(options)
			    .then(function (parsedBody) {
			        console.log("Counter update succeeded.");
			        res.status(200).json({
					    message: "Counter update succeeded."
					});
			    })
			    .catch(function (err) {
			        console.log("Counter update failed.");
			        res.send(err);
		    	});
	    })
	    .catch(function (err) {
	        console.log("POST failed.");
	        res.send(err);
    	});
});

///////////////////// Decrease Counter ////////////////////////////
/*
router.post('/deccounter', (req, res) => {

	//var id = parseInt(headers['X-Hasura-User-Id']);
	var game_id = parseInt(req.body.game_id);

// deleting data from player table

	var options = {
	    method: 'POST',
	    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
	    headers,
	    body: {
	    	"type" : "delete",
		    "args" : {
		        "table" : "player",
		        "where": {
		           "hasura_id": 22,
		           "game_id": game_id
		        }
		    }
	    },
    	json: true // Automatically stringifies the body to JSON
  	};

	rp(options)
	    .then(function (parsedBody) {
	        console.log("Delete succeeded.");
	        
	        // Check if counter is 0

			  var schemaFetchUrl = 'https://data.nonstop61.hasura-app.io/v1/query';
			  var options = {
			    method: 'POST',
			    headers,
			    body: JSON.stringify({
			      type: 'select',
			      args: {
			        "table": "game",
                    "columns": ['counter'],
                    "where": {
                        "game_id": {"$eq" : game_id}
                    }
			    }})
			  };

			  fetch(schemaFetchUrl, options)
			    .then(
			      (response) => {
			        response.json()
			          .then(
			            (data) => {
			            	console.log(data.counter);
			            	res.status(200).send(data);
			            },
			            (e) => {
			              res.json('Error in fetching current schema: ' + err.toString());
			            })
			          .catch((e) => {
			            e.stack();
			            res.json('Error in fetching current schema: ' + e.toString());
			          });
			      },
			      (e) => {
			        console.error(e);
			        res.json('Error in fetching current schema: ' + e.toString());
			      })
			    .catch((e) => {
			      e.stackTrace();
			      res.json('Error in fetching current schema: ' + e.toString());
			    });

	        /*
	        var options = {
		    method: 'POST',
		    uri: 'https://data.nonstop61.hasura-app.io/v1/query',
		    headers,
		    body: {
		    	"type":"update",
			    "args":{
			        "table":"game",
					 "$inc": { "counter" : 1  },
			        "where": {
			            "game_id": game_id
			        }
			    }
			    },
		    	json: true // Automatically stringifies the body to JSON
		  	};

		  	console.log(JSON.stringify(options.body));
		  	rp(options)
			    .then(function (parsedBody) {
			        console.log("Counter update succeeded.");
			        res.status(200).json({
					    message: "Counter update succeeded."
					});
			    })
			    .catch(function (err) {
			        console.log("Counter update failed.");
			        res.send(err);
		    	});
		    	
	    })
	    .catch(function (err) {
	        console.log("POST failed.");
	        console.log(err);
	        res.send(err);
    	});
});
*/
//////////////////////////end/////////////////////////////////

module.exports = router;
