const express = require("express");
const UserRoutes = require("./routers/User");
const config = require("./config");
const loaders = require("./loaders");

const app = express();

app.use(express.json());

config();
loaders();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
  app.use("/user", UserRoutes);
});
