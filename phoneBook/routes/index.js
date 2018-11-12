var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    FirstName: String,
    LastName: String,
    PhoneNumber: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* create  */
router.post('/comment', function(req, res, next) {
    
    console.log("In Post route");
    console.log(req.body);
    var newcomment = Comment(req.body);
    newcomment.save(function(err, result) {
        if (err) { console.log("ERROR"); }
        else {
            res.sendStatus(200);
        }
    })
});
/* get */
router.get("/comment", function(req, res, next) {
    
    console.log("In Get Route");
    var name = req.query["q"];
    var obj={};
    if(name){
        obj = {FirstName:name};
    }
    Comment.find(obj, function(err, list) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(list); //Otherwise console log the comments you found
            res.json(list);
        }

    })
});

router.delete("/comment", function(req, res, next) {
    console.log("In Delete Route");
   
    /*Comment.drop(function(err, result){
        if(err){console.log("ERROR");}
        else{
            res.sendStatus(200);
        }
    })*/
    
    var name = req.query["q"];
    var obj={};
    if(name){
        obj = {FirstName:name};
    }
    Comment.find(obj).remove(function(){});
    res.sendStatus(200);
});

module.exports = router;
