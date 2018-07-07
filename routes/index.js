var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var path = require('path')
var randomInt = require('random-int');
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');

var doctorId;
var userid;

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
    userid = req.body.username;
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
              if(type == "doctor"){
                console.log("doctor")


                database.ref('/appointments').once('value').then(function (snapshot) {
                    l=[]
                    snapshot.forEach(function (element) {

                        l.push({date:element.val().date,idp:element.val().beneficiaries_id})

                    });
                    res.render('docter',{list:l});
                }) ;

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
                res.render('newben',{})
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
  database.ref('/appointments').once('value').then(function(snapshot) {
    var data = snapshot.val();
    var datapassed = [];
    snapshot.forEach(function(element){
      if(element.val().is_approved == false){
        datapassed.push(element.val())
      }
    })
    console.log(datapassed);
    res.render('social_worker_requests', { data : datapassed});
  });
})

router.get('/sw', function(req, res, next){
  database.ref('/appointments').once('value').then(function(snapshot) {
    var data = snapshot.val();
    var datapassed = [];
    snapshot.forEach(function(element){
      datapassed.push(element.val());
    })
    console.log(datapassed)
    res.render('sw',{data: datapassed})
  });
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
    is_completed: "true",
    is_approved: "true"
  }
  console.log(data);
  console.log("the date takne");
  console.log(date);
  var it = 9;
  database.ref("appointments/AMD" + it).set(data).then(()=>{
    res.send("appointment is successfully done");
  });
})



//swaroop's new code

router.post('/newben', function(req, res, next) {
  console.log(req.body);

   var s=randomInt(100).toString();
   database.ref("profiles/beneficiaries/pat"+s).set({
       name: req.body.name,
       phoneno: req.body.contact,
       availability : "empty",
       medical_history: "emtpy",
       dob:req.body.dob

   });
   res.render('newben', {})

});

router.get("/approve/:some",function(req, res, next){
  console.log(req.params.some);
  database.ref('/appointments').once('value').then(function(snapshot) {
    var data = snapshot.val();
    snapshot.forEach(function(element){
      var ob = element.val();
      ob.is_approved = "true";
      if(element.val().beneficiaries_id == req.params.some){
        database.ref("appointments/" + element.key).set(ob);
      }
    })
    res.redirect('/');
  });
})


router.get("/disprove/:some",function(req, res, next){
  console.log(req.params.some);
  database.ref('/appointments').once('value').then(function(snapshot) {
    var data = snapshot.val();
    snapshot.forEach(function(element){
      if(element.val().beneficiaries_id == req.params.some){
        database.ref("appointments/" + element.key).set(null);
      }
    })
    res.redirect('/');
  });
})


router.get('/doctors_availability',function (req,res) {
  console.log("archita")
  res.render("doctors_availability_final")

});

router.post('/doctors_availability',function (req,res) {
  console.log(req.body.date);
  console.log("archita posted on snapchat");
  var date=req.body.date
  var start_time=req.body.start_time
  var end_time=req.body.end_time
  var s=date+" from "+start_time+ " to "+end_time
  console.log(s)
  console.log("profiles/doctor/"+userid+"/availability")


  data.ref("profiles/doctor/"+userid+1).set({"done":"homes"}).then(function () {
      res.render("doctors_availability_final")
  });
  res.render("doctors_availability_final")

});


module.exports = router;
