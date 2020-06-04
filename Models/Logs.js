// created date & time - updated - id per post (already saved)
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('log', {
        //once they're logged in. What you want their posts to show
        // name of table : data type
        owner: DataTypes.INTEGER, //how to pull their info to post ID
        text: DataTypes.TEXT, //users post (spill the tea)
        //cope: DataTypes.TEXT, //users put different ways they cope
        // need an edit & delete button
    })}