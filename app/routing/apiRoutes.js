// Require the modules and dependencies to run the script

var friendData = require ('../data/friends.js');
var path = require('path');

// Create and export functions required for the
// api routes

module.exports = function(app){
// A GET route with the url /api/friends. This will
// be used to display a JSON of all possible friends.
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});

// A POST route /api/friends. This will be used to 
// handle incoming survey results. This route will
// also be used to handle the compatibility logic

	app.post('/api/friends', function(req,res){

	// Create variables to calculate point difference
	// Best match at any point in the calculation will 
	// be stored in this object

	var bestMatch = {
		name: "",
		photo: "",
		matchPoints: 1000
	};

	// Store user data from the form into variables
	var userData = req.body;
	var userName = userData.name;
	var userphoto = userData.photo;
	var userPoints = userData.points;

	// Create variable for point difference
	var pointDifference = 0;

		// Get the difference between the user's score
		// and the friends in the database
		for(var i=0; i<friendData.length;i++){
			console.log(friendData[i].name);
			// reset total difference to 0
			pointDifference = 0;

			// Calculate the difference between user score 
			// and friend score
			for(var j =0; j<10; j++){
				pointDifference += Math.abs(parseInt(userPoints[j]) - parseInt(friendData[i].points[j]));
				// Compare new point difference with existing array data
				// and replace best match if point difference is lower
				if (pointDifference <= bestMatch.matchPoints){
					bestMatch.name = friendData[i].name;
					bestMatch.photo = friendData[i].photo;
					bestMatch.matchPoints = pointDifference;
				}
			}
		}

		// Push the user data to the friends array
		friendData.push(userData);
		// Send the response for the best match to the api route
		res.json(bestMatch);
	});
};