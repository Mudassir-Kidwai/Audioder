// ENTRY POINT
const express = require('express')
const exphbr = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const db = require('./config/database');

//TEST DB
/*  db.authenticate()
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('Error: ' + err));
*/

const index = express()
const PORT = process.env.PORT || 5000;

index.get('/', (req, res) => res.send('MAIN PAGE'))
index.use('/', require('./routes/gigs'))

index.listen(PORT, console.log(`Server started on port ${PORT}`))