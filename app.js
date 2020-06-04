require('dotenv').config()

var express = require('express')
var app = express()
var sequelize = require('./db')
// var test = require('./Controllers/TestController')
// Controllers
const logController = require('./Controllers/LogController')
const userController = require('./Controllers/UserController')
const testController = require('./Controllers/TestController')

//if you need to re-work database(delete & start again) {force:true}
sequelize.sync() 
app.use(express.json()) //parced into a json format, controller can now use info

// GET

app.get("/", function(req, res){
    res.send('Finally got it working')
})
app.get("/testing", function(req,res){
    res.send('testing')
})

// USE

app.use(require('./Middleware/Headers'))
app.use('/user', userController)
app.use('/log', logController)
app.use('/test', testController)

// PUT

// listen
app.listen(process.env.PORT, function(){
    console.log('App is listening on 3000')
})