import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import database from "./config/database.js";

import router from "./app/routes/index.js";
import golbalErrorsHandler from "./app/middleware/globalErrorHandler.js";
import { config } from "./config/env.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

const port = config.PORT;

// config env file
dotenv.config();

// cors policy
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
// parse data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

/* ROUTES HERE */

// test route
app.get("/", (req, res) => {
  res.cookie("test","test").json({message:"Server is running✅"});
});

app.use("/api/v1", router);

app.use(golbalErrorsHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Server is running at", port);
  database();
});
