var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var reservations = [];

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/add', function (req, res) {
  res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get('/all', function (req, res) {
  res.sendFile(path.join(__dirname, 'tables.html'));
});


app.get('/api/tables', function (req, res) {
  return res.json(reservations.slice(0, 5));
});

app.get('/api/waitlist', function (req, res) {
  return res.json(reservations.slice(5));
});

app.post('/api/table', function (req, res) {
  var newreservation = req.body;
  if (reservations.length > 5) {
    reservations.push(newreservation);
    console.log('Reservation made');
  } else {
    reservations.push(newreservation);
    console.log('You are on the waitlist');
  }

  console.log(newreservation);

  res.json(newreservation);
});


app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
