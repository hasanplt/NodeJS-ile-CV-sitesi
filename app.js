const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const fileUpload = require("express-fileupload");

// Routes
const indexRoutes = require("./routes/indexRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

//Middleware
const {requireAuth, checkUser} = require("./middlewares/authMiddleware");

const app = express();

const dbURL = "/MONGODBVERİTABANIBAGLANTILINK/";

mongoose.connect(dbURL)
.then((result) => {
    app.listen(3000);
    // console.log("başarılı bağlantı");
})
.catch((err) => {
    app.use((req, res) => { res.status(404).render("site/404", {title: "404"}); });
    // console.log("başarısız mongoose");
});

app.use(fileUpload());

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev")); 
app.use(cookieParser());

app.get("*", checkUser);

app.use("/", indexRoutes);
app.use("/user", authRoutes);
app.use("/iletisim", contactRoutes);
app.use("/admin", requireAuth, adminRoutes);

app.use((req, res) => {
    res.status(404).render("site/404");
});