var express = require('express');
var router = express.Router();


router.get('/',function(req,res,nex){
    console.log("hereeeeeee")
    res.render('social worker',{ })
})

router.get('/social_worker_booking', function(req, res, next){
    res.send("hello");
    // res.render('sw/social_worker_booking', {});
})

module.exports = router;