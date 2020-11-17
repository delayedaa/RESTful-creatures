let router = require('express').Router();
let fs = require('fs');

router.get('/', (req, res) => {
  let rawCryptids = fs.readFileSync('./cryptids.json');
  let myCryptids = JSON.parse(rawCryptids);
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

module.exports = router;