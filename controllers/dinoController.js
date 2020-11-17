let router = require('express').Router();
let fs = require('fs');

router.get('/', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  let nameFilter = req.query.nameFilter;
  if (nameFilter) {
    myDinos = myDinos.filter(element => {
      return element.name.toLowerCase() === nameFilter.toLowerCase();
    });
  }
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

router.delete('/:id', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  myDinos.splice(req.params.id, 1);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(myDinos));
  res.redirect('/dinosaurs');
});

router.get('/edit/:id', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  res.render('dinosaurs/edit', { dino: myDinos[req.params.id], dinoId: req.params.id });
});

router.put('/:id', (req, res) => {
  let rawDinos = fs.readFileSync('./dinosaurs.json');
  let myDinos = JSON.parse(rawDinos);
  myDinos[req.params.id].name = req.body.name;
  myDinos[req.params.id].type = req.body.type;
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(myDinos));
  res.redirect('/dinosaurs');
});

module.exports = router;