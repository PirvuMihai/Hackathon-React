//int id
const {DataTypes} = require(`sequelize`);

module.exports = (db) => {
    const loc = db.define("Loc", {

    }, { 
        freezeTableName: true,
        timeStamps: true,
    })
    return loc;
}