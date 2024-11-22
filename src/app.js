const express = require("express");
const app = express();
const port = 3000;
app.use("/test", (req,res) => {
  res.send("hello");
});
app.use("/orf", (req,res) => {
    res.send("helloPPPPPPPPPPPPPP");
  });
  app.use("/", (req,res) => {
    res.send("helloORROFF");
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
