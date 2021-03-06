const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const app = express();

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/reparaciones", require("./routes/reparaciones"));
app.use("/api/autos", require("./routes/autos"));

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

module.exports = app;
