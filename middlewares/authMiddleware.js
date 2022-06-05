const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, "31.secret69?", (err, decodedToken)=> {
            if(err){
                res.redirect("/user/login");
            }else{
                next();
            }
        });
    }else{
        res.redirect("/user/login");
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, "31.secret69?", async (err, decodedToken) => {
            if(err){
                res.locals.user = null;
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
}