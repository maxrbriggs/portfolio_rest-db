var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var friendModel = require('./models/friends');



router.post('/friends', function FriendsPostHandler(request, response){
    friendModel.insert( request.body.birthDate,
                        request.body.firstName,
                        request.body.lastName,
                        request.body.gender,
                        request.body.phone, function DoneInserting(err, resultId){
                            if (err){
                                console.log("Some error inserting");
                                console.log(err);
                                response.write("Error Inserting");
                            }else{
                                response.json({ insertedId: resultId });
                            }
                        } );
});

router.get('/friends', function FriendsGetHandler(request, response){
    friendModel.getAll(function DoneGettingAll(err, result, fields){
        if (err) {
            console.log("Some error selecting all");
            console.log(err);
            response.write("Error Getting All");
        } else {
            console.log("Successfully retrieve all records (100)");
            response.json(result);
        }
    });
});

router.put('/friends', function FriendsPutHandler(request, response){
	friendModel.update(function DoneUpdating(err, result){
		if (err) {
			console.log("Some error updating");
			console.log(err);
			response.write("Error Updating");
		} else {
			console.log("Successfully updated records");
			response.json(result);
		}
	});
});

router.delete('/friends', function FriendsDeleteHandler(request, response){
	friendModel.delete(function DoneDeleting(err, result){
		if (err) {
			console.log("Some error deleting");
			console.log(err);
			response.write("Error Deleting");
		} else {
			console.log("Successfully deleted records");
			response.json(result);
		}
	});
});

module.exports = router;
