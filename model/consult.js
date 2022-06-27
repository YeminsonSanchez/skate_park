const pool = require("./database").getInstance();

const newUser = async (payload) => {
  const query = {
    text: "INSERT INTO skater (email, nombre, password, anios_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    values: [
      payload[0],
      payload[1],
      payload[2],
      payload[3],
      payload[4],
      payload[5],
      payload[6],
    ],
  };
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("error: ", error, error.code, error.menssage);
    throw error;
  }
};

const getAllUser = async () => {
  const SQLQuery = {
    text: "SELECT id, email, nombre, anios_experiencia, especialidad, foto, estado FROM skater ORDER BY id ASC",
  };
  try {
    const result = await pool.query(SQLQuery);
    return result.rows;
  } catch (error) {
    console.log("error: ", error, error.code, error.menssage);
  }
};

const getUserByEmail = async (email) => {
  const SQLQuery = {
    text: "SELECT id, email, password, nombre, anios_experiencia, especialidad, foto, estado FROM skater WHERE email=$1",
    values: [email],
  };
  try {
    const result = await pool.query(SQLQuery);
    return result.rows[0];
  } catch (e) {
    console.log("error: ", e, e.code, e.menssage);
  }
};

const validateUser = async (email) => {
  const SQLQuery = {
    text: `SELECT id, email, password, nombre, anios_experiencia, especialidad, foto, estado  FROM skater WHERE email = $1`,
    values: [email],
  };
  try {
    const result = await pool.query(SQLQuery);
    return result.rows[0];
  } catch (error) {
    console.log("error: ", error, error.code, error.menssage);
  }
};
const setUserStatus = async (id, auth) => {
  try {
    const SQLQuery = {
      text: `UPDATE skater SET estado = $2 WHERE id = $1 RETURNING *;`,
      values: [id, auth],
    };
    const result = await pool.query(SQLQuery);
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};

const updateUser = async (
  id,
  nombre,
  hashedNewPassword,
  anios_experiencia,
  especialidad
) => {
  try {
    const SQLQuery = {
      text: `UPDATE skater SET  nombre = $2, password = $3 , anios_experiencia = $4 , especialidad = $5  WHERE id = $1 RETURNING *`,
      values: [id, nombre, hashedNewPassword, anios_experiencia, especialidad],
    };
    const result = await pool.query(SQLQuery);
    return result.rows[0];
  } catch (e) {
    console.log("error: ", e, e.code, e.menssage);
  }
};

const deleteUser = async (id) => {
  const SQLQuery = {
    text: `DELETE FROM skater WHERE id = $1 RETURNING *`,
    values: [id],
  };
  try {
    const result = await pool.query(SQLQuery);
    return result.rows[0];
  } catch (error) {
    console.log("error: ", error, error.code, error.menssage);
  }
};

module.exports = {
  newUser,
  getAllUser,
  getUserByEmail,
  setUserStatus,
  updateUser,
  deleteUser,
  validateUser,
};
