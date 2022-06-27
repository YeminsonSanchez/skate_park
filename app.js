const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");
const expressFileUpload = require("express-fileupload");
const routerSkate = require("./routers/routerSkate");
const routerViews = require("./routers/routerViews");
const configExpressFileUpload = require("./helpers/fileUpload");
const bcrypt = require("bcryptjs");
//Variables globales
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(expressFileUpload(configExpressFileUpload));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/axios",
  express.static(path.join(__dirname, "node_modules/axios/dist"))
);
app.use("/api/v1", routerSkate);
app.use("/", routerViews);
// Rutas

app.get("*", (req, res) => {
  res.redirect("/");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el http://localhost:${PORT}`);
});
