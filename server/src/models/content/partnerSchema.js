const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    imageUrl: {
type:String,
        required: [true,'ImageUrl is required']
    },
    imageAltText: {
        type:String,
        required: [true,'Image Alt Text is required']
    }
});

module.exports = mongoose.model('PartnerSchema', PartnerSchema)