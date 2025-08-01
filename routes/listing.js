const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


router.route("/")
.get(wrapAsync(listingController.index)) //index route
.post(isLoggedIn ,  
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing)); //create route after adding new list

//Create : NEW route
router.get("/new" , isLoggedIn,wrapAsync(listingController.renderNewForm));

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn , 
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn ,isOwner, wrapAsync(listingController.destroyListing));

//Update:Edit route
router.get("/:id/edit" ,isLoggedIn,isOwner ,wrapAsync(listingController.renderEditForm));


module.exports = router;