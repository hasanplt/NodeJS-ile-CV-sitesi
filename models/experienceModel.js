const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceModel = new Schema({
    title: {
        type: String,
        required: true
    },
    InfoItems: {
        type: Array,
        required: true
    },
    yearRange: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const experience = mongoose.model("experience", experienceModel);
module.exports = experience;