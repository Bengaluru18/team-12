var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssksolution-cb1ff.firebaseio.com",
});


var database = admin.database();


/* GET home page. */
router.get('/', function(req, res, next) {
  database.ref("users").set({
    username: "hello",
    email: "hell@gmail.com",
    profile_picture : "someurl"
  })
  database.ref('/users').once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(username);
    res.render('index', { title: 'Express', username:username });
  });
});

module.exports = router;
