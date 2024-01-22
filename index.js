import express from "express";
import os from "os";

// Get the hostname of the machine
const hostname = os.hostname();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server are runnig ");
});

app.listen(port, () => {
  console.log("server running at", port);
});
