const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 60*60*24; // 1 GÜN
const createToken = (id) => {
    return jwt.sign({id}, "31.secret69?", {expiresIn: maxAge});
} 

const login_get = (req, res) => {
    if(res.locals.user){
        res.redirect("/admin");
    }else{
        res.render("login/index");
    }
}

const login_post = async (req, res) => {
    const {email, password} = req.body;
    try{
        const checkDBUser = await userModel.login(email, password);
        const token = createToken(checkDBUser._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.redirect("/admin");
    }catch(error){
        console.log(error);
        res.redirect("/user/login");
    }
}

const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/user/login");
}

module.exports = {
    login_get,
    login_post,
    logout
}