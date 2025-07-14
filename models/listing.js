const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
    filename: String,
    url: String,
  },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
}});
//if we delete directly listing then this middleware helps to delete coreespond review also from database
listingSchema.post("findOneAndDelete" ,async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
})
const Listing = mongoose.model("listing" , listingSchema);
module.exports = Listing;