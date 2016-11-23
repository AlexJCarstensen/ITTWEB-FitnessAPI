var mongoose = require('mongoose');
var Workout = mongoose.model('Workout')

//GET all exercises
module.exports.exercisesGetAll = function (req, res) {
    var workoutId = req.params.workoutId;
    console.log('GET workoutId ', workoutId);

    Workout
        .findById(workoutId)
        .select('exercises')
        .exec(function (err, workout) {
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding Workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                console.log("WorkoutId not found in database", workoutId);
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found" + workoutId
                };
            }
            else {
                response.message = workout.exercises ? workout.exercises : [];
            }
            res
                .status(response.status)
                .json(response.message);
        });

};

//POST exercise
var addExercise = function (req, res, workout) {
    workout.exercises.push({
        name: req.body.name,
        description: req.body.description,
        repetitions: parseInt(req.body.repetitions, 10),
        sets: parseInt(req.body.sets, 10)
    });
    workout.save(function (err, workoutUpdated) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res.status(201)
                .json(workoutUpdated.exercises[workoutUpdated.exercises.length - 1])
        }
    });
};

//POST exercise to specific workout
module.exports.exercisesAddOne = function (req, res) {
    var workoutId = req.params.workoutId;
    console.log('POST workoutId ', workoutId);

    Workout
        .findById(workoutId)
        .select('exercises')
        .exec(function (err, workout) {
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding Workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                console.log("WorkoutId not found in database", workoutId);
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found" + workoutId
                };
            }
            if (workout) {
                addExercise(req, res, workout);
            }
            else {
                res
                    .status(response.status)
                    .json(response.message);
            }

        });
};

//GET specific exercise
module.exports.exercisesGetOne = function (req, res) {
    var workoutId = req.params.workoutId;
    var exerciseId = req.params.exerciseId;
    console.log("GET exerciseId " + exerciseId + " for workoutId " + workoutId);

    Workout
        .findById(workoutId)
        .select('exercises')
        .exec(function (err, workout) {

            console.log("Return workout", workoutId);
            var exercise = workout.exercises.id(exerciseId);
            var response = {
                status: 200,
                message: exercise
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!exercise) {
                response.status = 404;
                response.message = {
                    "message": "Exercise ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });
};


//PUT Exercise
module.exports.exercisesUpdateOne = function (req, res) {
    var workoutId = req.params.workoutId;
    var exerciseId = req.params.exerciseId;
    console.log('PUT exerciseId ' + exerciseId + ' for workoutId ' + workoutId);

    Workout
        .findById(workoutId)
        .select('exercises')
        .exec(function (err, workout) {
            var thisExercise;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                console.log("Workout id not found in database", workoutId);
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found " + workoutId
                };
            } else {
                // Get the review
                thisExercise = workout.exercises.id(exerciseId);
                // If the review doesn't exist Mongoose returns null
                if (!thisExercise) {
                    response.status = 404;
                    response.message = {
                        "message": "Exercise ID not found " + exerciseId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                thisExercise.name = req.body.name,
                    thisExercise.description = req.body.description,
                    thisExercise.repetitions = parseInt(req.body.repetitions, 10),
                    thisExercise.sets = parseInt(req.body.sets, 10)

                workout.save(function (err, workoutUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};

//DELETE exercise
module.exports.exercisesDeleteOne = function (req, res) {
    var workoutId = req.params.workoutId;
    var exerciseId = req.params.exerciseId;
    console.log('PUT exerciseId ' + exerciseId + ' for workoutId ' + workoutId);

    Workout
        .findById(workoutId)
        .select('exercises')
        .exec(function (err, workout) {
            var thisExercise;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                console.log("Workout id not found in database", workoutId);
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found " + workoutId
                };
            } else {
                // Get the exercise
                thisExercise = workout.exercises.id(exerciseId);
                // If the review doesn't exist Mongoose returns null
                if (!thisExercise) {
                    response.status = 404;
                    response.message = {
                        "message": "Exercise ID not found " + exerciseId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                workout.exercises.id(exerciseId).remove();
                workout.save(function (err, workoutUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};