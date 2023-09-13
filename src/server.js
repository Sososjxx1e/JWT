import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectDataBase from "./config/connectDB";
import initAPIRoutes from "./routes/api";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import JWTaction from "./middleware/JWTaction";
const app = express();
//config view engine
configViewEngine(app);
configCors(app);
app.options("/*", (_, res) => {
  res.sendStatus(200);
});
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test JWT

// config cookie-parser
app.use(cookieParser());

//init web route
initWebRoutes(app);
initAPIRoutes(app);

const PORT = process.env.PORT || 8000;

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("jwt is running" + PORT);
});
