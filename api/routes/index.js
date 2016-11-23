var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
userProperty: 'payload'
});

var workoutController = require('../controllers/workout.controllers.js');
var exerciseController = require('../controllers/exercises.controllers.js');
var authenticationController = require('../controllers/authentication.controllers.js');

router
  .route('/workouts')
  .get( workoutController.workoutsGetAll)
  .post( workoutController.workoutsAddOne);

router
  .route('/workouts/:workoutId')
  .get( workoutController.workoutsGetOne)
  .put( workoutController.workoutsUpdateOne)
  .delete( workoutController.workoutsDeleteOne);


router
  .route('/workouts/:workoutId/exercises')
  .get( exerciseController.exercisesGetAll)
  .post( exerciseController.exercisesAddOne);

router
  .route('/workouts/:workoutId/exercises/:exerciseId')
  .get( exerciseController.exercisesGetOne)
  .put( exerciseController.exercisesUpdateOne)
  .delete( exerciseController.exercisesDeleteOne);


// router
//   .post('/register', authenticationController.register)
//   .post('/login', authenticationController.login);

// /* GET home page. */
//  router.get('/', function (req, res, next) {
//     res.render('index', { title: 'Workouts' });
//  });
//   MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     //console.log(collection)

//     findDocuments(db, function (result) {
//       res.render('index', { title: 'Workouts', mytable: result });
//     })
//   });
//   //res.render('index', { title: 'Workouts' });
// });

// /* Put new Workout in database */
// router.post('/add', function (req, res, next) {
//   console.log("BODY");
//   console.log(req.jsonObject);
//   console.log("POST");
//   // Use connect method to connect to the server
//   MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     //Inserting into documents
//     insertDocuments(db, function () {
//       db.close();
//     }, req);
//   });


//   MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     findDocuments(db, function (result) {
//       res.render('index', { title: 'Workouts', mytable: result });
//       db.close();
//     });
//   });





// });

// /* Insert function */
// var insertDocuments = function (db, callback, req) {

//   console.log("Posting to database");

//   console.log(req.body.jsonObject)

//   db.collection('Workouts').insertOne(req.body, function (err, result) {
//     assert.equal(err, null);
//     console.log("Inserted the following records");
//     callback();
//   });


//   //  }



// }


// /*Read Function */
// var findDocuments = function (db, callback) {
//   // Get the documents collection
//   var collection = db.collection('Workouts');
//   // Find all documents
//   collection.find({}).toArray(function (err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// }



// var removeDocuments = function (db, callback) {
//   // Get the documents collection
//   var collection = db.collection('Workouts').deleteMany(
//     { "test": "Hello" }, function (err, results) {
//       callback();
//     }
//   )


// }

module.exports = router;
