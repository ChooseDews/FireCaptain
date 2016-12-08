var mongoose = require('mongoose');
var logger = require('./../bin/logger');
var config = require('./../bin/config');

var exports = {};
mongoose.connect(config.mongooseUrl);
mongoose.Promise = Promise;


var recursiveReadSync = require('recursive-readdir-sync');
var files = recursiveReadSync(__dirname + '/models');
logger.art('Models');
for (var file of files) {
    try {
      model = require(file)(mongoose);
      exports[model.name + 's'] = mongoose.model(model.name, model.schema);
      logger.info('Loaded Model ----- ' + file + ' As ' + model.name + 's');
    } catch (e) {
      logger.error('Failed to Load Model ----- ' + file);
      console.log(e);
    }
}

module.exports = exports;
