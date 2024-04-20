const {DataTypes} = require(`sequelize`);

module.exports = (db) => {
    const user = db.define("User", {
        nume:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        prenume: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        parola: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        telefon: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { 
        freezeTableName: true,
        timeStamps: true,
    })
    return user;
}