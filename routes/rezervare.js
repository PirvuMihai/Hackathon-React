express = require(`express`);

router = express.Router();

const RezervareController = require(`../controllers`).RezervareController;

router.post('/add', RezervareController.addRezervare);
router.get('/getByUser/:id', RezervareController.getRezervareByUserID);
router.get(`/getAvailable`, RezervareController.checkAvailability);

module.exports = router;