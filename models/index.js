const db = require (`../config/db`);
const sequelize = require(`sequelize`);
const {DataTypes} = require(`sequelize`);
const UserModel = require(`./user`);
const UserDb = UserModel(db, sequelize);

const LocModel = require(`./loc`);
const LocDb = LocModel(db, sequelize);

const RezervareModel = require(`./rezervare`);
const RezervareDb = RezervareModel(db, sequelize);


RezervareDb.belongsToMany(LocDb, { through: 'Loc_Rezervare' });
LocDb.belongsToMany(RezervareDb, { through: 'Loc_Rezervare' });

UserDb.hasMany(RezervareDb);
RezervareDb.belongsTo(UserDb);

module.exports = {
    UserDb,
    LocDb,
    RezervareDb,
}