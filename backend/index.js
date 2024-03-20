const express = require("express");

const mydatabase = require("mongoose");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "Content-Type");
   next();
 });


const PORT = 5000;
const DB =
  "mongodb+srv://sweboy:dmc54321@cluster0.trbboqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mydatabase
  .connect(DB)
  .then(() => {
    console.log("Daatabase Connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const server = app.listen(PORT, () => {
  console.log(`Server is running  on ${PORT}`);
});
