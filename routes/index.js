var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: "Express" });
});

router.get("/stage", function(req, res, next) {
  res.render("stage.html");
});

router.get("/control", function(req, res, next) {
  res.render("control.html");
});

router.get("/lighting", function(req, res, next) {
  res.render("lighting.html");
});

router.get("/object", function(req, res, next) {
  res.render("object.html");
});

router.get("/camera", function(req, res, next) {
  res.render("camera.html");
});

module.exports = router;
