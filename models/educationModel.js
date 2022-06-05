const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    yearRange: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    }
});

const education = mongoose.model("education", educationSchema);
module.exports = education;