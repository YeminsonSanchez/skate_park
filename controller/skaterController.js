const {
  newUser,
  getAllUser,
  getUserByEmail,
  setUserStatus,
  updateUser,
  deleteUser,
  validateUser,
} = require("../model/consult");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { showError } = require("../helpers/showError");

exports.createUser = async (req, res, next) => {
  const { image } = req.files;
  const { name } = image;

  const { email, fullName, password, repeatPassword, experience, specialty } =
    req.body;

  try {
    if (password !== repeatPassword) {
      res
        .status(401)
        .send(
          `<script>alert("contraseñas no son las mismas"); window.location.href="/registro"; </script>`
        );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const payload = [
        email,
        fullName,
        hashedPassword,
        experience,
        specialty,
        name,
        false,
      ];
      await newUser(payload);
      image.mv(
        `${path.join(__dirname, "../public/uploads/" + name)}`,
        (err) => {
          if (err) {
            console.log("err: ", err, err.code, err.message);
            res.send("Error, no se puede subir archivo");
          } else {
            res.send({ messge: "usuario creado con exito", code: 200 });
          }
        }
      );
    }
  } catch (e) {
    showError(res, e);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUser();
    res.status(200).send({ users });
  } catch (e) {
    showError(res, e);
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await validateUser(email);
    //verificamos que el usuario esta en la base de datos
    if (!user) {
      return res.status(404).send({
        error: "Este usuario no está registrado en la base de datos",
        code: 404,
      });
    }
    //verificamos que las password coincidan con bcrypt.compare
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword === false) {
      return res
        .status(401)
        .send({ error: "Credenciales inválida", code: 401 });
    }
    //entregamos el token al usuario para que acceda a la información

    if (!user.estado) {
      return res.status(401).send({
        error: "Este skater aún no está habilitado para acceder a su cuenta",
        code: 401,
      });
    }
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    res.send({ user, token });
  } catch (e) {
    showError(res, e);
  }
};

exports.updateUsersStatus = async (req, res) => {
  const { id, auth } = req.body;
  try {
    const usuario = await setUserStatus(id, auth);
    res.send(usuario.estado);
  } catch (e) {
    showError(res, e);
  }
};

exports.editUser = async (req, res) => {
  const {
    id,
    nombre,
    password,
    repeatPassword,
    anios_experiencia,
    especialidad,
  } = req.body;
  const hashedNewPassword = await bcrypt.hash(password, 10);
  //console.log(hashedNewPassword)
  try {
    await updateUser(
      id,
      nombre,
      hashedNewPassword,
      anios_experiencia,
      especialidad
    );
    res.status(200).send("Datos actualizados con éxito");
  } catch (e) {
    showError(res, e);
  }
};

exports.destroyUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).send();
  } catch (e) {
    showError(res, e);
  }
};
