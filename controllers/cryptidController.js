let router = require('express').Router();
const { json } = require('body-parser');
let fs = require('fs');

router.get('/', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
  let nameFilter = req.query.nameFilter;
  if (nameFilter) {
    myCryptids = myCryptids.filter(element => {
      return element.name.toLowerCase() === nameFilter.toLowerCase();
    });
  }
  res.render('cryptids/index', { myCryptids: myCryptids });
});

router.get('/new', (req, res) => {
  res.render('cryptids/new');
});

router.get('/:id', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
  let index = parseInt(req.params.id) - 1;
  res.render('cryptids/show', { myCryptid: myCryptids[index] });
});

router.post('/', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
  myCryptids.push(req.body);
  fs.writeFileSync('./cryptids.json', JSON.stringify(myCryptids));
  res.redirect('/cryptids');
});

router.delete('/:id', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
  myCryptids.splice(req.params.id, 1);
  fs.writeFileSync('./cryptids.json', JSON.stringify(myCryptids));
  res.redirect('/cryptids');
});

router.get('/edit/:id', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
  res.render('cryptids/edit', { cryptid: myCryptids[req.params.id], cryptidId: req.params.id });
});

router.put('/:id', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
  myCryptids[req.params.id].name = req.body.name;
  myCryptids[req.params.id].img_url = req.body.img_url;
  fs.writeFileSync('./cryptids.json', JSON.stringify(myCryptids));
  res.redirect('/cryptids');
});

module.exports = router;