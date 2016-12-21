var express = require('express');
var app = express();
var cmd = require('node-cmd');
var bodyParser = require('body-parser');
var path = require("path");
var last = '';

var working = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views',path.resolve(__dirname, './views'));


var updateCMD = '. '+path.resolve(__dirname, '../update.sh');
console.log(updateCMD);

app.get('/test', function (req, res) {
res.render('home')
});

app.get('/', function (req, res) {
  cmd.get(
       'printf "<b>Current Commit</b>\\n" && git log -n 1 && printf "\\n\\n<b>Git Status</b>\\n" && git status',
       function(data){
         res.render('home', {status: data.replace(/(?:\r\n|\r|\n)/g, '<br />'), working: working})
       }
   );
});

app.get('/history', function (req, res) {
  cmd.get(
       'git log',
       function(data){
         res.render('history', {logs: data.replace(/(?:\r\n|\r|\n)/g, '<br />'), working: working})
       }
   );
});

app.get('/update', function (req, res) {
Update();
res.redirect('/');
});

app.get('/working', function (req, res) {
  res.send('Working: '+working)
});

app.get('/last', function (req, res) {
  res.render('last', {last: last})
});




var Update = function(){
  console.log('Updating From Production');

if(!working){



 working = true;
 cmd.get(
      updateCMD,
      function(data){
        console.log('Got Here')
        console.log(data);
        last = data.replace(/(?:\r\n|\r|\n)/g, '<br />');
        cmd.run('pm2 reload www');
        working = false;
      }
  );

}else{
  console.log('Attempted to double work!');
}


};

app.post('/github', function (req, res) {
  if(req.body && req.body.ref.indexOf('production') > 0){
    Update();
  }
  console.log(req.body);
  res.send('Good');
});

app.listen(2000, function () {
  console.log('Continues Deployment Listening On 2000');
});
