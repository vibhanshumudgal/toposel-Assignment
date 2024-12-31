const express = require("express");
const ProfileRouter = express.Router();
const { authenticateUser, vEditData } = require("../helper/Validation");

ProfileRouter.get("/profile/view", authenticateUser, async (req, res) => {
    const profile = req.user;
    res.send(profile);
  });
  

ProfileRouter.patch("/profile/edit", authenticateUser , async (req,res) => {
       try{

          if(!vEditData(req)){
            throw new Error("Enter data contains such that that cant be change");
          }

          const newData = req.body;
          const databaseData = req.user;

          for (const key in newData) {
           
              databaseData[key] = newData[key];
            
          }
            await databaseData.save();
          console.log(databaseData);
          res.send("edit succesfull");

       }
       catch(error){
        res.json({error : error.message})
       }
})
  module.exports = ProfileRouter;