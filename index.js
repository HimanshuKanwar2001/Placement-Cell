const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//use express router
app.use("/", require("./routes"));

//setup the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server ", err);
  }
  console.log("Server is running on port ", port);
});
