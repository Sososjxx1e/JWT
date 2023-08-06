import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();
const app = express();
//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web route
initWebRoutes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("jwt is running" + PORT);
});
