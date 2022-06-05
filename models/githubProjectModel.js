const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const githubSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo_link: {
        type: String,
        required: true
    },
    github_link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const githubProject = mongoose.model("githubProject", githubSchema);
module.exports = githubProject;