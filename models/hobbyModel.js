const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hobbyModel = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

const hobby = mongoose.model("hobby", hobbyModel);
module.exports = hobby;