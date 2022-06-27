const { Pool } = require("pg");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const Singleton = (() => {
  var instance;
  function createInstance() {
    var classObj = new Pool(config);
    return classObj;
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
        console.log("Conexión a la base de datos establecida");
      } else {
        console.log("Ya existe una conexión a la base de datos");
      }
      return instance;
    },
  };
})();

module.exports = Singleton;
