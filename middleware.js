const Listing =require("./models/listing");
const Review =require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl =req.originalUrl;
    req.flash("error", "You must login before adding new listing");
    return res.redirect("/login");
  }
  next();
};
//middleware for redirecting to that path where i try to login
module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl =req.session.redirectUrl;
  }
  next();
}
//middleware for authorisation , only owner can edit or delete listing
module.exports.isOwner = async(req,res,next)=>{
  let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the user of this listing");
         return res.redirect(`/listings/${id}`);
    }
    next();
}
//middleware for authorisation , only author can edit or delete review
module.exports.isReviewAuthor = async(req,res,next)=>{
  let {id ,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the user of this listing");
         return res.redirect(`/listings/${id}`);
    }
    next();
}

//validating schema.js
module.exports.validateListing =(req,res,next)=>{
  let {error} =listingSchema.validate(req.body);
   if(error){
    throw new ExpressError(400 , error);
   } else{
       next();
   }
};
//validating review
module.exports.validateReview =(req,res,next)=>{
  let {error} =reviewSchema.validate(req.body);
   if(error){
    throw new ExpressError(400 , error);
   } else{
       next();
   }
};