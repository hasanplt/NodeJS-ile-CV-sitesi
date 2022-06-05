const router = require("express").Router();
const contactController = require("../controller/contactController");

router.get("/", contactController.contact_get);
router.post("/ekle", contactController.contact_post);


module.exports = router;