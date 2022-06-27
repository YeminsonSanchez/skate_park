const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");
const { requireAuth } = require("../helpers/auth");
const { getAllUser } = require("../model/consult");
const { showError } = require("../helpers/showError");

router.get("/", viewController.index);

router.get("/registro", viewController.register);

router.get("/admin", viewController.admin);

router.get("/login", viewController.login);

router.get("/edit", requireAuth, async (req, res) => {
  const users = await getAllUser();
  try {
    res.render("Edit", { users, user: req.user });
  } catch (e) {
    showError(res, e);
  }
});

module.exports = router;
