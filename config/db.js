const Sequelize = require(`sequelize`);

let db = new Sequelize("hackathon", "root", "", {
    dialect: `mysql`,
    host: `localhost`,
    logging: false,
    define: {
        charset:`utf8`,
        collate:`utf8_general_ci`,
        timestamps:true,
    }
});

module.exports = db;