var express = require('express');
var router = express.Router();


router.get('/',function(req,ress,nex){
    console.log("hereeeeeee")
    res.render('receptionist',{ })
})

module.exports = router;