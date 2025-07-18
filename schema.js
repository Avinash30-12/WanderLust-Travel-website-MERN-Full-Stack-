const Joi = require('joi');

module.exports.listingSchema =Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        price : Joi.number().required(),
        image: Joi.object({
                 url: Joi.string().uri().allow("", null)
               }).optional(),
        location: Joi.string().required(),
        country : Joi.string().required().min(0)
    }).required()
});
//validation forr reviewss
module.exports.reviewSchema =Joi.object({
    review : Joi.object({
        rating: Joi.number().required().min(0).max(5),
        comment : Joi.string().required(),
    }).required(),
})