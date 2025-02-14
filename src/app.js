const express = require("express");
const DbConnectFunction = require("./config/dbConnectFun");
const cookie_parcer = require("cookie-parser");

const app = express();
const port = 3000;

const AuthRouter = require("./Routers/AuthRouter");
const ProfileRouter = require("./Routers/Profile");


app.use(express.json());
app.use(cookie_parcer());

app.use("/",AuthRouter);
app.use("/",ProfileRouter);

DbConnectFunction()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is runniuuung on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
