var express = require('express')
var router = express.Router()
var sequelize = require('../db')

// GET
router.get('/', function(req,res){
    res.send('/ Test route working')
})
router.get('/get-test', function(req,res){
    res.send('GET testing route working')
})

// POST
router.post('/post-test', function(req,res){
    res.send('POST testing route working')
})

// basic post
router.post('/save', (req, res) => {
    let testData = "This is a working test";

    TestModel
    .create({
        //.create returns a promise
        // have to set the values/ colums to the value you want to give
        testdata: testData,
    })
    //defining test data below
    .then(databaseData => {
        console.log(databaseData);
        res.send("Data is working")
    })
})

// parsing
router.post('/parse', (req, res)=>{
    // the request coming into the server. going into the body of the reqest
    let testData = req.body.testData.item;
    res.send("this is the parse")
})


module.exports = router
