const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillsSchema = new Schema({
    skills: {
        type: Array,
        required: true
    },
    levels: {
        type: Array,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const skill = mongoose.model("skill", skillsSchema);

module.exports = skill;