let express = require('express');
let app = express();
let ejsLayouts = require('express-ejs-layouts');
let methodOverride = require('method-override');

let dinoController = require('./controllers/dinoController');
let cryptidController = require('./controllers/cryptidController');

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));


app.use('/dinosaurs', dinoController);
app.use('/cryptids', cryptidController);

app.get('/', (req, res) => {
  res.send('This is the home page.');
});

app.listen(8000, () => {
  console.log('The server is up and running!');
});