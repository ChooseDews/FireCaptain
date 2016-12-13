var socket = function(db, logger, config, exports) {

	var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });


	exports.emit = function(area, message){
		io.emit(area, message);
	};



  return exports;
};


module.exports = socket;
