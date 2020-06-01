module.exports = function(sequelize, DataTypes) {
    return sequelize.define('test', {
        //defining diff colums here
        testdata: DataTypes.STRING
    })
}