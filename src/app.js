const express = require("express");
const config = require("./config");
const loaders = require("./loaders");

const app = express();

app.use(express.json());

config();
loaders();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
