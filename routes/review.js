const express= require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview , isLoggedIn ,isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/review.js");

//review , Adding review Post route
router.post("/" , isLoggedIn,validateReview, wrapAsync(reviewController.addReview))
//review delete route
router.delete("/:reviewId" , isLoggedIn,isReviewAuthor ,wrapAsync(reviewController.destroyReview))
module.exports = router;