const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // host: 'localhost',
    dialect: 'postgres'
}) //creating new sequelize Object

//authenticating sequelize - an asycnchrnis function
sequelize.authenticate() 
.then(
    function success() { 
        console.log("Connected to the database.")
    },
    function error(err){
        console.log(err)
    }
);
module.exports = sequelize //kicking the sequelize out of file