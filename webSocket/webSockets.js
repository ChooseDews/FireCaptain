var recursiveReadSync = require('recursive-readdir-sync')
var files = recursiveReadSync(__dirname);
var express = require('express');

module.exports = function(io, services) {
	services.logger.art('Sockets');
  for (var route of files) {
    if (route.indexOf('webSockets.js') == -1) {
      services.logger.info("Loading Socket -------------- "+route);
      require(route)(io, services);
    }
  }
};
