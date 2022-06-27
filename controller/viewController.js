const { getAllUser, getUserByEmail } = require("../model/consult");
const { showError } = require("../helpers/showError");




exports.index = async (req, res, next) => {
  try {
    const users = await getAllUser();
    res.render("index", { users });
  } catch (e) {
    showError(res, e);
  }
};

exports.register = (req, res, next) => {
  res.render("Registro");
};

exports.admin = async (req, res, next) => {
  try {
    const users = await getAllUser();
    res.render("Admin", { users });
  } catch (e) {
    showError(res, e);
  }
};

exports.login = async (req, res, next) => {
  res.render("Login");
};

exports.edit = async (req, res) => {
  const { email, token } = req.params;
  try {
    const thisUser = await getUserByEmail(email);
    res.render("Edit", { thisUser, user: req.user });
  } catch (e) {
    showError(res, e);
  }
};
