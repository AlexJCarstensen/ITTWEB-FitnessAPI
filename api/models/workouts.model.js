var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    repetitions : {
        type : Number,
        required : true
    },
    sets : {
        type : Number,
        required : true
    }
});

var workoutSchema = new mongoose.Schema({
     name : {
         type : String,
         required : true
     },
     user : {
         type : String,
         required : true
     },
     exercises : [exerciseSchema]
});

mongoose.model('Workout', workoutSchema, 'workouts');