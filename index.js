import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import database from "./config/index.js";
import process from "process";
import router from "./app/routes/index.js";
import golbalErrorsHandler from "./app/middleware/globalErrorHandler.js";


const app = express();
const port = process.env.PORT || 5000;

// config env file
dotenv.config();

// cors policy
app.use(cors());

// parse data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES HERE */

// test route
app.get("/", (req, res) => {
  res.send("Server is running✅");
});

app.use("/api/v1", router);

app.use(golbalErrorsHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Server is running at", port);
  database();
});
