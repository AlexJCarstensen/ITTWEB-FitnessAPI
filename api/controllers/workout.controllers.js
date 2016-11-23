var mongoose = require('mongoose');
var Workout = mongoose.model('Workout');
var User = mongoose.model('User');


var getAuthor = function(req, res, callback) {
    console.log("Finding author with email " + req.payload.email);
    if (req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec(function(err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(user);
                callback(req, res, user.email);
            });

    } else {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }

};


//GET Workouts
module.exports.workoutsGetAll = function(req, res) {
    console.log("Get all workouts");


    // getAuthor(req, res, function (req, res, userEmail) {       
    Workout
        .find({ user: req.user.email })
        .exec(function(err, workouts) {
            var response = {
                status: 200,
                message: workouts
            };
            if (err) {
                console.log("Error finding workouts");
                response.status = 500;
                response.message = err;
            }

            console.log("Found " + workouts.length + " workouts");
            res
                .status(response.status)
                .json(response.message)

        });
    // })  

};

//GET specific Workout
module.exports.workoutsGetOne = function(req, res) {
    var workoutId = req.params.workoutId;
    console.log('Get workoutId', workoutId);

    Workout
        .findById(workoutId)
        .exec(function(err, workout) {
            var response = {
                status: 200,
                message: workout
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
}

//POST Workout
module.exports.workoutsAddOne = function(req, res) {

    Workout
        .create({
            name: req.body.name,
            user: req.body.email
        }, function(err, workout) {
            if (err) {
                console.log("Error creating workout");
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("workout created", workout)
                res
                    .status(201)
                    .json(workout);
            }
        });
};

//PUT Workout
module.exports.workoutsUpdateOne = function(req, res) {

    var workoutId = req.params.workoutId;
    console.log('PUT workoutId', workoutId);

    Workout
        .findById(workoutId)
        .select("-exercises")
        .exec(function(err, workout) {
            var response = {
                status: 200,
                message: workout
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                workout.name = req.body.name;
            }

            workout.save(function(err, workoutUpdated) {
                if (err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json();
                }
            })

        });
}

//DELETE Workout
module.exports.workoutsDeleteOne = function(req, res) {
    var workoutId = req.params.workoutId;
    console.log('DELETE workoutId', workoutId);

    Workout
        .findByIdAndRemove(workoutId)
        .exec(function(err, workout) {

            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Workout deleted, id:", workout);
                res
                    .status(204)
                    .json();
            }
        });
};