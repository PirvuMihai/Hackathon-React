//data, durata, fk la user

const {DataTypes} = require(`sequelize`);

module.exports = (db) => {
    const rezervare = db.define("Rezervare", {
        inceput:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        final:{
            type:DataTypes.DATE,
            allowNull: false,
        },
    }, { 
        freezeTableName: true,
        timeStamps: true,
    })
    return rezervare;
}