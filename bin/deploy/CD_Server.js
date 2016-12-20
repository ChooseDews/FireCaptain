var express = require('express');
var app = express();
var cmd = require('node-cmd');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  cmd.get(
       'git status',
       function(data){
           res.send(data);
       }
   );
});

app.get('/log', function (req, res) {
  cmd.get(
       'git log',
       function(data){
           res.send(data);
       }
   );
});

app.get('/update', function (req, res) {
  cmd.get(
       '. ./update.sh',
       function(data){
           res.send(data);
       }
   );
});

app.post('/github', function (req, res) {
  console.log(req.body);
res.send('Good');
});

app.listen(2000, function () {
  console.log('Continues Deployment Listening On 2000');
});
