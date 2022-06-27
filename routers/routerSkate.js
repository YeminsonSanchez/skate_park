const express = require("express");
const router = express.Router();
const skaterController = require("../controller/skaterController");


router.get("/users", skaterController.getAllUsers);
router.post("/registro", skaterController.createUser);
router.post("/login", skaterController.login);
router.put("/users/status", skaterController.updateUsersStatus);
router.put("/user/update/", skaterController.editUser);
router.delete("/user/delete/:id", skaterController.destroyUser);
module.exports = router;
