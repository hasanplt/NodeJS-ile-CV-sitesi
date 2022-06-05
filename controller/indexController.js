const aboutModel = require("../models/aboutModel");
const skillModel = require("../models/skillsModel");
const socialMediaModel = require("../models/socialMediaModel");
const educationModel = require("../models/educationModel");
const experienceModel = require("../models/experienceModel");
const hobbyModel = require("../models/hobbyModel");
const siteSettingsModel = require("../models/siteSettingsModel");
const githubProjectModel = require("../models/githubProjectModel");

const index = async (req, res) => {
    var durum = req.query.durum;
    const aboutDatas = await aboutModel.findOne({});
    const skillDatas = await skillModel.findOne({});
    const socialMediaDatas = await socialMediaModel.findOne({});
    const educationDatas = await educationModel.find({});
    const experienceDatas = await experienceModel.find({});
    const hobbyDatas = await hobbyModel.find({});
    const siteSettingsDatas = await siteSettingsModel.findOne({});
    const githubProjects = await githubProjectModel.find({});
    res.render("site/index", {
        about: aboutDatas, 
        socialMedia: socialMediaDatas, 
        skills: skillDatas, 
        education: educationDatas, 
        experience: experienceDatas, 
        hobby: hobbyDatas, 
        settings: siteSettingsDatas, 
        githubProjects: githubProjects,
        durum: durum
    });
}

module.exports = {
    index
}