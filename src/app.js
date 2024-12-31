const express = require("express");
const DbConnectFunction = require("./config/dbConnectFun");
const cookie_parcer = require("cookie-parser");
const validator = require("validator");
const app = express();
const port = 3000;
const { authenticateUser } = require("./helper/Validation");
const User = require("./model/User");
const AuthRouter = require("./Routers/AuthRouter");
const ProfileRouter = require("./Routers/Profile");
const requestRouter = require("./Routers/Request");

app.use(express.json());
app.use(cookie_parcer());

app.use("/",AuthRouter);
app.use("/",ProfileRouter);
app.use("/",requestRouter);


app.get("/feed", authenticateUser, async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.get("/feed/:id", authenticateUser, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!validator.isMongoId(id)) {
      throw new Error("Enter a valid ID");
    }
    const data = req.body;
    const notallowedfields = new Set();
    notallowedfields.add("email");
    notallowedfields.add("gender");
    notallowedfields.add("userId");

    for (let key of Object.keys(data)) {
      if (notallowedfields.has(key)) {
        throw new Error(`Field ${key} is not allowed to be updated`);
      }
    }

    const result = await User.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.body.id);
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});



DbConnectFunction()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is runniuuung on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
