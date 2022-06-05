const contactModel = require("../models/contactModel");

const contact_post = (req, res) => {
    const contact = new contactModel(req.body);
    contact.save().then((result) => {
        res.redirect("/?durum=basarili#contact");
        // console.log("başarılı");
    })
    .catch(err => {
        res.redirect("/?durum=basarisiz#contact");
    });
}
const contact_get = (req, res) => {
    res.redirect("/#contact");
}

module.exports = {
    contact_post,
    contact_get
}