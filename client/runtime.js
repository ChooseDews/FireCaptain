var path = require('path')
var webpack = require('webpack')
var config = require('./webpack/webpack.config.dev')
var compiler = webpack(config)

module.exports = function(app, express, env) {


    if (env === 'dev') {

        var middleware = require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath,
            contentBase: 'src',
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                modules: false
            }
        });

        app.use(middleware);
        app.use(require('webpack-hot-middleware')(compiler, {
            log: console.log
        }));

        app.use(express.static(path.join(__dirname, '/dist')));


        app.get('*', function response(req, res) {
            res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
            res.end();
        });



    }else{

      app.use(express.static(path.join(__dirname, '/dist')))

      app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'))
      })

    }




};
