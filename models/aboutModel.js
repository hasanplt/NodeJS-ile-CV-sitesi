const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortInfo: {
        type: String,
        required: true
    },
    longInfo: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    photoLink: {
        type: String,
        required: true
    }
});

const about = mongoose.model("about", aboutSchema);
module.exports = about;