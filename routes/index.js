const express = require(`express`);
const router = express.Router();

const UserRouter = require(`./user`);
const RezervareRouter = require("./rezervare");

router.use(`/user`, UserRouter);
router.use(`/rezervare`, RezervareRouter);

module.exports = router;