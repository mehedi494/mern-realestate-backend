import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./config/index.js";

const app = express();
const port = process.env.PORT || 5000;

// config eng file
dotenv.config();

// cors policy
app.use(cors());

// parse data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* root url for testing server is alive or not  */
app.get("/", (req, res) => {
  res.send("Server are runnig ");
});

app.listen(port, () => {
  console.log("server running at", port);
  database();
});
