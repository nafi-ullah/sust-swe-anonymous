const express = require("express");
const CommentInfo = require("../models/comment");
const PostInfo = require("../models/post");
const mongoose = require("mongoose");
const moment = require('moment');

// Get current date and time
const currentDateTime = moment().format('h:mma D-MMM-YYYY');

//console.log(currentDateTime); // Output: 9:30pm 20-Mar-2024


const commentRouter = express.Router();


commentRouter.post("/api/comment", async (req, res) => {

  const {  postid, comment } = req.body;


    try {

     
     
      let pushComment = new CommentInfo({
        postid,
        comment,
        time: moment().add(6, 'hours').format('h:mma D-MMM-YYYY'),

      });
      
      pushComment = await pushComment.save();
      console.log(pushComment);

      const postId = await PostInfo.findOne({_id : postid });

     
      postId.count = postId.count + 1;
  
      const updatePost = await postId.save();


      return res.json(pushComment);
      
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  //http://localhost:3000/api/get-candidates?post=assistant_general_secretary&year=2024


  commentRouter.get("/api/comments", async (req, res) => {
    try {
        const postid = req.query.postid;
     
      const comments = await CommentInfo.find({postid}).sort({ _id: -1 });;
      
  
      res.json( comments);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  


module.exports = commentRouter;


