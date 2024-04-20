const express = require(`express`);

const router = express.Router();

const UserController = require(`../controllers`).UserController;

router.post(`/register`, UserController.register);
router.post(`/login`, UserController.login);
router.get(`/getAll`, UserController.getAllUsers);
router.get(`/getByID/:id`, UserController.getUserById);
router.patch(`/update/:id`, UserController.updateUser);
router.delete(`/delete/:id`, UserController.deleteUser);

module.exports = router;