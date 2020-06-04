var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var User = sequelize.import('../Models/User')


// SIGN UP POST

router.post('/signup', (req,res) =>{
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
        let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
        console.log(token)
        res.status(200).json({
            user: user,
            text: 'User created',
            sessionToken: token,
        })
    })
    .catch(err => res.status(500).json(err))
})

// router.post('/signin', (req, res) =>{
//     //vid sign in - bcrypt.compare
// })


// SIGN IN POST

router.post('/signin', (req,res) => {
    User.findOne({ where: {email: req.body.email}})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if (matches) { //if the password matches
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24}) //token lasts for a day

                    res.status(200).json({
                        user: user,
                        message: 'Logged In',
                        sessionToken: token,
                    })
                } else {
                    //if password mismatch
                    res.status(401).json({ error: "Password does not match. Try again."})
                }
            })
        } else {
            // if no user
            res.status(404).json({error: "User not found."})
        }
    })
})

// GET
router.get('/user', (req, res) => {
    UserModel.findAll()
        .then(users = res.status(200).json(users))
        .catch(err => res.status(500).json(err))
})


module.exports = router
