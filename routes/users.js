var urlPath = '/api/me';
module.exports = function (app, router, services) {


   router.get('/', function(req,res){
      res.send('hello');
  });





  app.use(urlPath, router);
};
