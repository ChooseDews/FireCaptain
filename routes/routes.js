var recursiveReadSync = require('recursive-readdir-sync')
var files = recursiveReadSync(__dirname);
var express = require('express');

module.exports = function(app, services) {
	services.logger.art('Routes');
  for (var route of files) {
    if (route.indexOf('routes.js') == -1) {
      services.logger.info("Loading Route -------------- "+route);
      require(route)(app, express.Router(), services);
    }
  }
};
