const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialMediaSchema = new Schema({
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    github: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedin: {
        type: String
    }
});

const socialMedia = mongoose.model("socialMedia", socialMediaSchema);
module.exports = socialMedia;