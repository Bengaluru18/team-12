var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var path = require('path')
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssksolution-cb1ff.firebaseio.com",
});

var docter = require("./docter.js");
var sw = require("./sw");
var receptionist = require("./receptionist");

var database = admin.database();

router.get('/', function(req, res, next){
  res.render('index', { })
})


router.post('/login', function(req, res, next) {
  database.ref('/login').once('value').then(function(snapshot) {
    var data = snapshot.val();
    console.log(req.body);
    console.log(snapshot.val());
    var userid = req.body.username;
    var password = req.body.password;
    console.log(data.doc1);
    snapshot.forEach(function(element){
      if(userid == element.key){
        console.log("user id match")
        console.log(element.val().password)
        console.log(password);
          if(password == element.val().password){
              console.log("password  match");
              var type = element.val().type;
              if(type == "docter"){
                console.log("docter")
                res.render('docter',{});
              }
            
              if(type=="sw"){
                console.log("sw")
                res.render('sw',{})
              }
              
              if(type=="receptionist"){
                console.log("receptionist")
                res.render('receptionist',{})
              }

          }
        }
    });
  });
});

module.exports = router;
