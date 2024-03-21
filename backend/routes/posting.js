const express = require("express");
const PostInfo = require("../models/post");
const mongoose = require("mongoose");
const moment = require('moment');

// Get current date and time
const currentDateTime = moment().format('h:mma D-MMM-YYYY');

//console.log(currentDateTime); // Output: 9:30pm 20-Mar-2024


const postRouter = express.Router();


postRouter.post("/api/post", async (req, res) => {

  const {  post } = req.body;


    try {

     
     
      let pushPost = new PostInfo({
        _id: new mongoose.Types.ObjectId(),
        post,
        time: moment().add(6, 'hours').format('h:mma D-MMM-YYYY'),
        count: 0,

      });
      
      pushPost = await pushPost.save();
      //console.log(pushPost);


      return res.json(pushPost);
      
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  //http://localhost:3000/api/get-candidates?post=assistant_general_secretary&year=2024


  postRouter.get("/api/post", async (req, res) => {
    try {
     
      const posts = await PostInfo.find({}).sort({ _id: -1 });
      
  
      res.json( posts);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  


module.exports = postRouter;


