const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.addReview =async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    newReview.author =req.user._id; 
    listing.reviews.push(newReview);
 
    await newReview.save();
    await listing.save();
    req.flash("success" , "Thanks for the Review");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.destroyReview = async(req, res)=>{
   let {id , reviewId} =req.params;

   await Listing.findByIdAndUpdate(id , {$pull:{reviews : reviewId}}); //pull operator used for remove from database also
   await Review.findByIdAndDelete(reviewId);
   res.redirect(`/listings/${id}`);
}