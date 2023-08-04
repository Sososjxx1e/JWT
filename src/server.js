import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
const app = express();
//config view engine
configViewEngine(app);

//init web route
initWebRoutes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("jwt is running" + PORT);
});
