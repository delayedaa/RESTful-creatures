let express = require('express');
let app = express();
let ejsLayouts = require('express-ejs-layouts');
let dinoController = require('./controllers/dinoController');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use('/dinosaurs', dinoController);

app.get('/', (req, res) => {
  res.send('This is the home page.');
});

app.listen(8000, () => {
  console.log('The server is up and running!');
});