// //data, durata, fk la user

// const {DataTypes} = require(`sequelize`);

// module.exports = (db) => {
//     const loc_rezervare = db.define("Loc_Rezervare", {
//         data_inceput:{
//             type:DataTypes.DATE,
//             allowNull: false,
//         },
//         data_final:{
//             type:DataTypes.DATE,
//             allowNull: false,
//         },
//     }, { 
//         freezeTableName: true,
//         timeStamps: true,
//     })
//     return loc_rezervare;
// }