const router = require("express").Router();
const authController = require("../controller/authController");

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/logout", authController.logout);

module.exports = router;