var express = require('express')
var app = express.Router()
// remeber to export as "app"
var sequelize = require('../db')
var Log = sequelize.import('../Models/Logs')
var valSess = require('../Middleware/ValidateSession')



// USER POSTS GO HEREEEEE

// app.post('/', valSess, (req, res) => {
//     if(!req.errors) {
//         const newPostFromRequest = {
//             description: req.body.description,
//             userId: req.user.id
//         }
//         newPost.create(newPostFromRequest)
//         .then(newPost => res.status(200).json(newPost))
//         .catch(err => res.json(err))
//     } else {
//         res.status(500).json(req.errors)
//     }
// })

app.post("/newpost", valSess, function(req, res) {
    if (!req.errors){
    var userid = req.user.id;
    console.log(req.body.text)
    Log.create({
      text: req.body.text,
      owner: userid
    })
      .then(
        function createSuccess(newPost) {
          res.json({
            description: newPost
          });
        },
        function createError(err) {
          res.send(500, err.message);
        }
      )
      .catch(function createError(err) {
        res.send(500, err.message);
      });
    } else {
        res.status(500).send(req.errors)
    }
  });

app.post("/log", function(req, res) {
    // var owner = req.user.id;

      if(!req.errors){
          const logfromrequest = {
            description: req.body.description,
            // cope: req.body.cope,
            owner: userId
          }
          userPosts.create(logfromrequest)
          .then(newLog => res.status(200).json(newLog))
          .catch(err => res.json(err))
        } else {
            res.status(500).json(req.errors)
        }
  });

  app.post('/log/', function(req, res){
    res.send('This is from the api/log (post)')
})

// GET

app.get('/allposts', valSess, function(req, res){
    Log.findAll({where:{owner: req.user.id}})
    .then(logs => res.status(200).json(logs))
    .catch(error => res.status(500).json(error)) 
})

app.get('/potato', function(req, res){
    res.send('This potato')
})


// PUT

app.put('/:id' ,valSess, function(req,res){
    Log.update(req.body, {where : {owner: req.user.id, id: req.params.id}})
    .then(data => res.status(200).json(data))
})

// DELETE
app.delete('/:id' ,valSess, function(req, res){
    Log.destroy({where: {owner: req.user.id, id: req.params.id}})
    .then(data => req.status(200).json(data))
    .catch(err => res.status(500).json(err))
})



module.exports = app

// module.exports = router







