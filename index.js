const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore=require('connect-mongo') (session);
const sassMiddleware=require('node-sass-middleware');
const  CsvParser=require('json2csv');

app.use(sassMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}))
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



//setup the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement_cell",
    //TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      
        mongooseConnection:db,
        autoRemove:'disabled',
      
    },
    function(err){
      console.log(err || 'connect-mongodb setup ok');
    }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes"));


app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server ", err);
  }
  console.log("Server is running on port ", port);
});
