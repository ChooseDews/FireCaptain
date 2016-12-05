
global.Promise = require("bluebird"); //Use Bluebird


var recursiveReadSync = require('recursive-readdir-sync')
var files = recursiveReadSync(__dirname);
var path = require('path');
var db = require(__dirname + '/../db/db.js');
var logger = require(__dirname + '/../bin/logger.js');
var config = require(__dirname + '/../bin/config.js');
var services = {};

logger.art('Services');
for (var service of files) {
  var name = service.replace(/\\/g,'/').split('/');
  name = name[name.length - 1].replace('.js', '');
  logger.info("Loading Service ------------ "+service);
  if (name != 'services') services[name] = require(service)(db, logger, config, {});
}




services.db = db;
services.config = config;
services.logger = logger;

module.exports = services;
