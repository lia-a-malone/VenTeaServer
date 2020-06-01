var jwt = require('jsonwebtoken')
var sequelize = require('../db')
const User = require('../db').import('../models/User')

const validateSession = (req,res, next) => {
    // next (); -- the request will be sent to the "next" place it should be to move forward
        const token = req.headers.authorization; //will reach into the headers of the request
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (!err && decodedToken) {
                User.findOne({where: {id: decodedToken.id}}) //want to find the user in the database
                    .then(user => {
                        if (!user) throw 'err'; //throw is used for different errs
    
                        req.user = user; //creating a new request property & contains all of the user's info
                        return next()
                    })
                    .catch(err => next(err))
            } else {
                req.errors = err;
                return next()
            }
        })
    }
    module.exports = validateSession