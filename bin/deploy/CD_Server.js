var express = require('express');
var app = express();
var cmd = require('node-cmd');


app.get('/', function (req, res) {
  cmd.get(
       'git status',
       function(data){
           res.send(data);
       }
   );
});

app.listen(2000, function () {
  console.log('Continues Deployment Listening On 2000');
});
