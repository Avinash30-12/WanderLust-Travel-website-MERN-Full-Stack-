if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const session =require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const flash = require ("connect-flash");
const passport= require("passport");
const LocalStrategy =require("passport-local");
const User = require("./models/user.js");
//const {isLoggedIn} = require("./middleware.js");


const listingRoutes = require("./routes/listing.js"); 
const reviewsRoutes = require("./routes/review.js"); 
const userRoutes = require("./routes/user.js"); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(cookieParser());

const dbUrl = process.env.ATLASDB_URL;
//connecting mongodb
main().then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}
const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret :process.env.SECRET,
    },
    touchAfter: 24*3600 ,
});
store.on("err" ,()=> {
    console.log("error in mongo session store" , err)
});
const sessionOptions = {
    store,
    secret :process.env.SECRET,
    resave : false,
    saveUninitialized: true,
    cookie: {
       expires: Date.now() + 7 * 1000 * 60 * 60 * 24,
        maxAge: 7 * 1000 * 60 * 60 * 24, // 1 day
        httpOnly : true,
    },
};
// app.get("/", wrapAsync((req, res,next)=>{
//     res.send("i m Home");
// }));

app.use(session(sessionOptions));
app.use(flash());
//using passport package for login/signup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flashing message 
app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error =req.flash("error");
    res.locals.currUser = req.user; //stored user is login or not
    next();
});
app.use("/listings" , listingRoutes);
app.use("/listings/:id/reviews" , reviewsRoutes);
app.use("/" , userRoutes);


//error handling for all different routes
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
// Error handler - must be the last middleware
app.use((err, req, res, next) => {
  // Prevent double responses
  if (res.headersSent) return next(err); 
  
  // Set default error if missing
  const error = err instanceof ExpressError ? err : new ExpressError(500, 'Something broke!');
  
  // Simple error response
  res.status(error.statusCode).render("listings/error", { err})
});


app.listen(8080 ,()=>{
    console.log("App is listening");
})