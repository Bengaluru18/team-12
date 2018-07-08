var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
    console.log("hereeeeeee")
    res.render('docter',{ })
})

router.get('/hello', function(req, res, next){
    res.send("helloworld");
})

module.exports = router;