let router = require('express').Router();
let fs = require('fs');

router.get('/', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  res.render('dinosaurs/index', { myDinos: myDinos });
});

router.get('/new', (req, res) => {
  res.render('dinosaurs/new');
});

router.get('/:id', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  let index = parseInt(req.params.id) - 1;
  res.render('dinosaurs/show', { myDino: myDinos[index] });
});

router.post('/', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  myDinos.push(req.body);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(myDinos));
  res.redirect('/dinosaurs');
});

module.exports = router;