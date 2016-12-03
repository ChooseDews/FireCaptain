var urlPath = '/api/test';
module.exports = function (app, router, services) {


  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });


  app.use(urlPath, router);
};
