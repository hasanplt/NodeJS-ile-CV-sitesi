const aboutModel = require("../models/aboutModel");
const skillModel = require("../models/skillsModel");
const socialMediaModel = require("../models/socialMediaModel");
const hobbyModel = require("../models/hobbyModel");
const educationModel = require("../models/educationModel");
const experienceModel = require("../models/experienceModel");
const contactModel = require("../models/contactModel");
const siteSettingsModel = require("../models/siteSettingsModel");
const githubProjectsModel = require("../models/githubProjectModel");
const path = require("path");

const index_get = (req, res) => {
    res.render("admin/index", {get: "index"});
}

// Hakkında
const hakkinda_get = async (req, res) => {

    if(req.query.durum == "ok"){
        var durum = true;
    }else if(req.query.durum == "no"){
        var durum = false;
    }else{
        var durum = null;
    }

    var aboutDatas = await aboutModel.findOne({});
    var date = new Date(aboutDatas.birthday);
    aboutDatas.birthdayString = date.getFullYear() + "-";
    if((date.getMonth() + 1) < 10){
        aboutDatas.birthdayString += "0" + (date.getMonth() + 1) + "-";
    }else{
        aboutDatas.birthdayString += (date.getMonth() + 1) + "-";
    }
    if(date.getDate() < 10){
        aboutDatas.birthdayString += "0" + date.getDate();
    }else{
        aboutDatas.birthdayString += date.getDate();
    }
    res.render("admin/hakkinda", {get: "hakkinda", about: aboutDatas, durum: durum});
}

const hakkinda_post = async (req, res) => {
    var postDatas = req.body;
    delete postDatas.txt;
    var date = new Date(postDatas.birthday);
    delete postDatas.birthday;
    postDatas.birthday = date;
    try{
        const about = await aboutModel.findOne({});
        Object.assign(about, postDatas);
        about.save();
        res.redirect("/admin/hakkinda?durum=ok");
    }catch{
        res.redirect("/admin/hakkinda?durum=no");
    }
    
}

//Yetenekler
const yetenekler_get = async (req, res) => {
    const skills = await skillModel.findOne({});
    res.render("admin/yetenekler", {get: "yetenekler", yetenekler: skills});
}
const yeteneklerDuzenle_get = async (req, res) => {
    const id = req.params.id;
    const skills = await skillModel.findOne({});
    res.render("admin/yetenekDuzenle",{get: "yetenekler", yetenekler: skills, id: id, durum: null});
}
const yeteneklerDuzenle_post = async (req, res) => {
    const id = req.params.id;
    var postDatas = req.body;
    delete postDatas.txt;
    try{
        const yetenekler = await skillModel.findOne({});
        var newYetenekler = yetenekler;
        newYetenekler.skills[id] = postDatas.name;
        newYetenekler.levels[id] = postDatas.level;
        Object.assign(yetenekler, newYetenekler);
        yetenekler.save();
        res.redirect(`/admin/yetenekler/duzenle/${id}?durum=ok`);
    }catch{
        res.redirect(`/admin/yetenekler/duzenle/${id}?durum=no`);
    }
}
const yeteneklerSil_get = async (req, res) => {
    const id = req.params.id;
    try{
        const yetenekler = await skillModel.findOne({});
        var newYetenekler = yetenekler;
        newYetenekler.skills.splice(id, 1);
        newYetenekler.levels.splice(id, 1);
        Object.assign(yetenekler, newYetenekler);
        yetenekler.save();
        res.redirect(`/admin/yetenekler`);
    }catch{
        res.redirect(`/admin/yetenekler`);
    }
}
const yeteneklerEkle_get = (req, res) => {
    res.render("admin/yetenekEkle", {get: "yetenekler"});
}
const yeteneklerEkle_post = async (req, res) => {
    var postDatas = req.body;
    try{
        const yetenekler = await skillModel.findOne({});
        var newYetenekler = yetenekler;
        newYetenekler.skills.push(postDatas.name);
        newYetenekler.levels.push(postDatas.level);
        Object.assign(yetenekler, newYetenekler);
        yetenekler.save();
        res.redirect(`/admin/yetenekler`);
    }catch{
        res.redirect(`/admin/yetenekler`);
    }
}

// Sosyal Medya
const sosyalMedya_get = (req, res) => {
    const getDatas = req.query.durum;
    var durum;
    if(getDatas == "ok"){
        durum = true;
    }else if(getDatas == "no"){
        durum = false;
    }else{
        durum = null;
    }
    socialMediaModel.findOne({}).then((result) => {
        res.render("admin/sosyalmedya", {get: "sosyalmedya", durum: durum, sosyalmedya: result});
    });
}
const sosyalMedya_post = async (req, res) => {
    var postDatas = req.body;
    delete postDatas.txt;
    try{
        const sosyalmedya = await socialMediaModel.findOne({});
        Object.assign(sosyalmedya, postDatas);
        sosyalmedya.save();
        res.redirect(`/admin/sosyalmedya?durum=ok`);
    }catch{
        res.redirect(`/admin/sosyalmedya?durum=no`);
    }
}

// Hobiler
const hobiler_get = async (req, res) => {
    const hobiler = await hobbyModel.find({});
    res.render("admin/hobiler", {get: "hobiler", hobiler: hobiler});
}
const hobilerDuzenle_get = async (req, res) => {
    const hobi = await hobbyModel.findOne({_id: req.params.id});
    res.render("admin/hobiDuzenle", {get: "hobiler", durum:null, id:req.params.id, hobi: hobi});
}
const hobilerDuzenle_post = async (req, res) => {
    var postDatas = req.body;
    delete postDatas.txt;
    try{
        const hobi = await hobbyModel.findOne({_id: req.params.id});
        Object.assign(hobi, postDatas);
        hobi.save();
        res.redirect(`/admin/hobiler/duzenle/${req.params.id}?durum=ok`);
    }catch{
        res.redirect(`/admin/hobiler/duzenle/${req.params.id}?durum=no`);
    }
}
const hobilerSil_get = (req, res) => {
    hobbyModel.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect("/admin/hobiler");
    });
}
const hobilerEkle_get = (req, res) => {
    res.render("admin/hobiEkle", {get: "hobiler"});
}
const hobilerEkle_post = (req, res) => {
    var postDatas = req.body;
    delete postDatas.txt;
    const hobi = new hobbyModel(postDatas);
    hobi.save((err, data) => {
        res.redirect("/admin/hobiler");
    });
}

// Eğitimler
const egitim_get = async (req, res) => {
    const egitimler = await educationModel.find({});
    res.render("admin/egitimler", {get: "egitimler", egitimler: egitimler});
}
const egitimDuzenle_get = async (req, res) => {
    var durum;
    if(req.query.durum == "ok"){
        durum = true;
    }else if(req.query.durum == "no"){
        durum = false;
    }else{
        durum = null;
    }
    const egitim = await educationModel.findOne({_id: req.params.id});
    res.render("admin/egitimDuzenle", {get: "egitimler", egitim: egitim, durum: durum});
}
const egitimDuzenle_post = async (req, res) => {
    try {
        const egitim = await educationModel.findOne({_id: req.params.id});
        var postDatas = req.body;
        delete postDatas.txt;
        Object.assign(egitim, postDatas);
        egitim.save();
        res.redirect(`/admin/egitimler/duzenle/${req.params.id}?durum=ok`);
    } catch (error) {
        res.redirect(`/admin/egitimler/duzenle/${req.params.id}?durum=no`);
    }
    
}
const egitimSil_get = (req, res) => {
    educationModel.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect("/admin/egitimler");
    });
}
const egitimEkle_get = (req, res) => {
    res.render("admin/egitimEkle", {get: "egitimler"});
}
const egitimEkle_post = async (req, res) => {
    var postDatas = req.body;
    delete postDatas.txt;
    const egitim = new educationModel(postDatas);
    await egitim.save();
    res.redirect("/admin/egitimler");
}

// Tecrübeler
const tecrubeler_get = async (req, res) => { 
    const tecrubeler = await experienceModel.find({});
    res.render("admin/tecrubeler", {get: "tecrubeler", tecrubeler: tecrubeler});
}
const tecrubelerEkle_get = async (req, res) =>{
    res.render("admin/tecrubeEkle", {get: "tecrubeler"});
}
const tecrubelerEkle_post = async (req, res) => {
    const tecrube = new experienceModel(req.body);
    await tecrube.save();
    res.redirect("/admin/tecrubeler");
}
const tecrubelerDuzenle_get = async (req, res) => { 
    const tecrube = await experienceModel.findOne({_id: req.params.id});
    res.render("admin/tecrubeDuzenle", {get: "tecrubeler", tecrube: tecrube});

}
const tecrubelerDuzenle_post = async (req, res) => { 
    try {
        const tecrube = await experienceModel.findOne({_id: req.params.id});
        Object.assign(tecrube, req.body);
        tecrube.save();
        res.redirect(`/admin/tecrubeler/duzenle/${req.params.id}?durum=ok`);
    } catch (error) {
        res.redirect(`/admin/tecrubeler/duzenle/${req.params.id}?durum=no`);
    }
}
const tecrubeSil_get = (req, res) => {
    experienceModel.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect("/admin/tecrubeler");
    });
}

// Mesajlar
const mesajlar_get = async (req, res) => { 
    const mesajlar = await contactModel.find({});
    res.render("admin/mesajlar", {get: "mesajlar", mesajlar: mesajlar});
}
const mesajlarDuzenle_get = async (req, res) => {
    const mesaj = await contactModel.findOne({_id: req.params.id});
    var newMesaj = mesaj;
    newMesaj.see = 1;
    Object.assign(mesaj, newMesaj);
    mesaj.save();
    res.render("admin/mesajDuzenle", {get: "mesajlar", mesaj: mesaj});
}
const mesajSil_get = async (req, res) =>{
    contactModel.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect("/admin/mesajlar");
    });
}

// Ayarlar
const ayarlar_get = async (req, res) => {
    const ayarlar = await siteSettingsModel.findOne({});
    res.render("admin/ayarlar", {get: "ayarlar", ayarlar: ayarlar, durum: null});
}
const ayarlar_post = async (req, res) => {
    const ayarlar = await siteSettingsModel.findOne({});
    var postDatas = req.body;
    delete postDatas.MAX_FILE_SIZE;
    postDatas.mini_icon = "favicon.png";
    if(req.files != null){
        req.files.fileIcon.mv(path.resolve(__dirname, "../public/assets/img", "favicon.png"));
    } 
    Object.assign(ayarlar, postDatas);
    ayarlar.save();
    res.redirect("/admin/ayarlar");
}

// Github Projeler
const projeler_get = async (req, res) => {
    const projeler = await githubProjectsModel.find({});
    res.render("admin/projeler", {get: "projeler", projeler: projeler});
}
const projeEkle_get = async (req, res) => {
    res.render("admin/projeEkle", {get: "projeler"});
}
const projeEkle_post = async (req, res) => {
    var postDatas = req.body;
    delete postDatas.MAX_FILE_SIZE;
    if(Array.isArray(postDatas.tags)){
        postDatas.category = postDatas.tags.join(" ");
    }else{
        postDatas.category = postDatas.tags;
    }
    delete postDatas.tags;
    if(req.files != null){
        req.files.photo.mv(path.resolve(__dirname, "../public/admin/assets/img/projectsImages", req.files.photo.name)); 
        postDatas.photo_link = req.files.photo.name;
    }
    const proje = new githubProjectsModel(postDatas);
    await proje.save();
    res.redirect("/admin/projeler");
}
const projeSil_get = (req, res) => {
    githubProjectsModel.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect("/admin/projeler"); 
    });
}
const projeDuzenle_get = async (req, res) => {
    const proje = await githubProjectsModel.findOne({_id: req.params.id});
    res.render("admin/projeDuzenle", {get: "projeler", proje: proje, durum: null});
}
const projeDuzenle_post = async (req, res) => {
    const proje = await githubProjectsModel.findOne({_id: req.params.id});
    console.log(req.body);
    var postDatas = req.body;
    delete postDatas.MAX_FILE_SIZE;
    if(req.files != null){
        postDatas.photo_link = req.files.photo.name;
        req.files.photo.mv(path.resolve(__dirname, "../public/admin/assets/img/projectsImages", req.files.photo.name));
    }else{
        postDatas.photo_link = proje.photo_link;
    }
    if(Array.isArray(postDatas.tags)){
        postDatas.category = postDatas.tags.join(" ");
    }else{
        postDatas.category = postDatas.tags;
    }
    delete postDatas.tags;
    Object.assign(proje, postDatas);
    proje.save();
    res.redirect(`/admin/projeler/duzenle/${req.params.id}`);
}

module.exports = {
    index_get,
    hakkinda_get,
    hakkinda_post,
    yetenekler_get,
    yeteneklerDuzenle_get,
    yeteneklerDuzenle_post,
    yeteneklerSil_get,
    yeteneklerEkle_get,
    yeteneklerEkle_post,
    sosyalMedya_get,
    sosyalMedya_post,
    hobiler_get,
    hobilerDuzenle_get,
    hobilerDuzenle_post,
    hobilerSil_get,
    hobilerEkle_get,
    hobilerEkle_post,
    egitim_get,
    egitimDuzenle_get,
    egitimDuzenle_post,
    egitimSil_get,
    egitimEkle_get,
    egitimEkle_post,
    tecrubeler_get,
    tecrubelerEkle_get,
    tecrubelerEkle_post,
    tecrubelerDuzenle_get,
    tecrubelerDuzenle_post,
    tecrubeSil_get,
    mesajlar_get,
    mesajlarDuzenle_get,
    mesajSil_get,
    ayarlar_get,
    ayarlar_post,
    projeler_get,
    projeEkle_get,
    projeEkle_post,
    projeSil_get,
    projeDuzenle_get,
    projeDuzenle_post
}