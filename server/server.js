const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid();
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  console.log('Inside the Homepage callback function!');
  console.log(req.sessionID);
  // by now, the session middleware has been run
  // and the sessionID has been added to the request object

  res.send(`You just hit the Home Page!`);
})

app.get('/login', (req, res) => {
  console.log('Inside the GET /login callback function!');
  console.log(req.sessionID);
  res.send(`You got the login page!`);
});

app.post('/login', (req, res) => {
  console.log('Inside POST /login callback function');
  console.log(req.body);
  res.send(`You posted to the login page!`);
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
