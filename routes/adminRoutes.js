const router = require("express").Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.index_get);

// Hakkında
router.get("/hakkinda", adminController.hakkinda_get);
router.post("/hakkinda", adminController.hakkinda_post);

// Yetenekler
router.get("/yetenekler", adminController.yetenekler_get);
router.get("/yetenekler/duzenle/:id", adminController.yeteneklerDuzenle_get);
router.post("/yetenekler/duzenle/:id", adminController.yeteneklerDuzenle_post);
router.get("/yetenekler/sil/:id", adminController.yeteneklerSil_get);
router.get("/yetenekler/ekle", adminController.yeteneklerEkle_get);
router.post("/yetenekler/ekle", adminController.yeteneklerEkle_post);

// Sosyal Medya
router.get("/sosyalmedya", adminController.sosyalMedya_get);
router.post("/sosyalmedya", adminController.sosyalMedya_post);

// Hobiler
router.get("/hobiler", adminController.hobiler_get);
router.get("/hobiler/duzenle/:id", adminController.hobilerDuzenle_get);
router.post("/hobiler/duzenle/:id", adminController.hobilerDuzenle_post);
router.get("/hobiler/sil/:id", adminController.hobilerSil_get);
router.get("/hobiler/ekle", adminController.hobilerEkle_get);
router.post("/hobiler/ekle", adminController.hobilerEkle_post);

// Eğitimler
router.get("/egitimler", adminController.egitim_get);
router.get("/egitimler/duzenle/:id", adminController.egitimDuzenle_get);
router.post("/egitimler/duzenle/:id", adminController.egitimDuzenle_post);
router.get("/egitimler/sil/:id", adminController.egitimSil_get);
router.get("/egitimler/ekle", adminController.egitimEkle_get);
router.post("/egitimler/ekle", adminController.egitimEkle_post);

// Tecrübeler
router.get("/tecrubeler", adminController.tecrubeler_get);
router.get("/tecrubeler/ekle", adminController.tecrubelerEkle_get);
router.post("/tecrubeler/ekle", adminController.tecrubelerEkle_post);
router.get("/tecrubeler/duzenle/:id", adminController.tecrubelerDuzenle_get);
router.post("/tecrubeler/duzenle/:id", adminController.tecrubelerDuzenle_post);
router.get("/tecrubeler/sil/:id", adminController.tecrubeSil_get);

// Mesajlar
router.get("/mesajlar", adminController.mesajlar_get);
router.get("/mesajlar/duzenle/:id", adminController.mesajlarDuzenle_get);
router.get("/mesajlar/sil/:id", adminController.mesajSil_get);

// Ayarlar
router.get("/ayarlar", adminController.ayarlar_get);
router.post("/ayarlar", adminController.ayarlar_post);

// Github Projeler
router.get("/projeler", adminController.projeler_get);
router.get("/projeler/ekle", adminController.projeEkle_get);
router.post("/projeler/ekle", adminController.projeEkle_post);
router.get("/projeler/duzenle/:id", adminController.projeDuzenle_get);
router.post("/projeler/duzenle/:id", adminController.projeDuzenle_post);
router.get("/projeler/sil/:id", adminController.projeSil_get);


module.exports = router;