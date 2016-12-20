var express = require('express');
var app = express();
var cmd = require('node-cmd');
var bodyParser = require('body-parser');

var working = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  cmd.get(
       'git status',
       function(data){
           res.send(data.replace(/(?:\r\n|\r|\n)/g, '<br />'));
       }
   );
});

app.get('/log', function (req, res) {
  cmd.get(
       'git log',
       function(data){
         res.send(data.replace(/(?:\r\n|\r|\n)/g, '<br />'));
       }
   );
});

app.get('/update', function (req, res) {
  cmd.get(
       '. ./update.sh',
       function(data){
         res.send(data.replace(/(?:\r\n|\r|\n)/g, '<br />'));
       }
   );
});

var Update = function(){
  console.log('Updating From Production');
 working = true;
  cmd.get(
       '. ./update.sh',
       function(data){
         console.log('Finished Updating From Production');

           working = false;
       }
   );
};

app.post('/github', function (req, res) {
  if(req.body && req.body.ref.indexOf('production')){
    Update();
  }
  console.log(req.body);
  res.send('Good');
});

app.listen(2000, function () {
  console.log('Continues Deployment Listening On 2000');
});
