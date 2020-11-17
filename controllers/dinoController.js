let router = require('express').Router();
let fs = require('fs');

router.get('/', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  res.render('dinosaurs/index', { myDinos: myDinos });
});

module.exports = router;