var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: "Express" });
});

router.get("/playground", function(req, res, next) {
  res.render("playground.html");
});

router.get("/playground/stage", function(req, res, next) {
  res.render("playground/stage.html");
});

router.get("/playground/control", function(req, res, next) {
  res.render("playground/control.html");
});

router.get("/playground/lighting", function(req, res, next) {
  res.render("playground/lighting.html");
});

router.get("/playground/object", function(req, res, next) {
  res.render("playground/object.html");
});

router.get("/playground/camera", function(req, res, next) {
  res.render("playground/camera.html");
});

module.exports = router;
