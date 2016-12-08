var urlPath = '/api';
module.exports = function (app, router, services) {


  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Root Api' });
  });


  app.use(urlPath, router);
};
