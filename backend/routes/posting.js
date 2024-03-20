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
        time: moment().format('h:mma D-MMM-YYYY'),

      });
      
      pushPost = await pushPost.save();
      //console.log(pushPost);


      return res.json(pushPost);
      
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  //http://localhost:3000/api/get-candidates?post=assistant_general_secretary&year=2024


//   candidateRouter.get("/api/get-candidates", async (req, res) => {
//     try {
     
//       const post = req.query.post;
//       const year =  req.query.year;

//       if (!year || !post) {
//         return res.status(400).json({ error: 'Both year and post parameters are required' });
//       }

//       const candidates = await CandidateInfo.find({
//         year
//       });
//       const allCandidates = candidates.map(candidate => candidate.candidateList);
//       const flattenedCandidates = allCandidates.flat();

//       const filteredData = flattenedCandidates.filter(element => element.candidatePost === post);

  
//       res.json({ candidateList: filteredData || [] });
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
//   });

  


module.exports = postRouter;


