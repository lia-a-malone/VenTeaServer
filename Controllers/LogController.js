var express = require('express')
var app = express.Router()
// remeber to export as "app"
var sequelize = require('../db')
var Log = sequelize.import('../Models/Logs')

// GET

app.get('/log/', function(req, res){
    res.send('This is from the log (get)')
})

app.get('/log/:id', function(req, res){
    res.send('This is from the /log/:id (get)')
})

// POST

app.post('/log/', function(req, res){
    res.send('This is from the api/log (post)')
})

// PUT

app.put('/log/:id' , function(req,res){
    res.send('This is from the api/log/:id (put)')
})

// DELETE
app.delete('/log/:id' , function(req, res){
    res.send('This is from the api/log/:id (delete)')
})


module.exports = app

// module.exports = router