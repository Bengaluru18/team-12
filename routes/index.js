var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var path = require('path')
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');

var doctorId;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssksolution-cb1ff.firebaseio.com",
});

var docter = require("./docter");
var sw = require("./sw");
var receptionist = require("./receptionist");

var database = admin.database();

router.get('/', function(req, res, next){
  res.render('index', { })
})


router.post('/dashboard', function(req, res, next) {
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
                database.ref('/appointments').once('value').then(function(snapshot) {
                  var data = snapshot.val();
                  var datapassed = [];
                  snapshot.forEach(function(element){
                    datapassed.push(element.val());
                  })
                  console.log(datapassed)
                  res.render('sw',{data: datapassed})
                });
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



//below is the backend for social worker 

router.get('/social_worker_booking', function(req, res, next){
  res.render('social_worker_booking', {});
})

router.post('/SocialWorkerBooking', function(req, res, next){
  var data = req.body;
  var docterId = data.doctor_id;
  docterId = docterId;
  console.log(docterId);
  var dates = [];
    database.ref('/profiles/doctor').once('value').then(function(snapshot) {
      var data = snapshot.val();
      console.log(data);
      snapshot.forEach(function(element){
        console.log(element.val().availableDate);
        var availableDate = element.val().availableDate;
        var availableTime = element.val().availableTime;
        var starttime = availableTime.charAt(0);
        var endtime = availableTime.charAt(3);
        dates.push("date :" + availableDate +" from " + starttime + " to " + endtime);
      })
      res.render('socialworkerGetTime',{data : dates});
    });
})

router.get('/social_worker_requests', function(req, res, next){
  res.render('social_worker_requests', {});
})

router.get('/sw', function(req, res, next){
  res.render('sw', {})
})

router.post('/createApointmentsw', function(req, res, next){
  var beneficiaries_id  = req.body.beneficiary_id;
  var date = req.body.datetime; 
  var doctor_id = doctorId; 
  var is_cancelled = false; 
  var is_completed = true;

  var data = {
    beneficiaries_id: beneficiaries_id,
    date: date,
    doctor_id: "jk", 
    is_cancelled: "false",
    is_completed: "true"
  }
  console.log(data);
  var it = 9;
  database.ref("appointments/AMD" + it).set(data).then(()=>{
    res.send("appointment is successfully done");
  });
})

module.exports = router;
