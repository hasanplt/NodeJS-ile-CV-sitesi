const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    mini_icon: {
        type: String,
        required: true
    },
    meta_description: {
        type: String,
        required: true
    }
});

const siteSetting = mongoose.model("siteSetting", settingSchema);
module.exports = siteSetting;