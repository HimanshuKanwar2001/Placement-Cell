const express = require("express");

const path = require("path");
const port = 8080;
const app = express();

//use express router
app.use("/", require("./routes"));


//setup the view engine
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));



app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server ", err);
  }
  console.log("Server is running on port ", port);
});