var payload = function(db, logger, config, exports) {

// Handles All the payload returns!

	var ErrorLogger = function(error){
		logger.error('We had an Api Error');
		console.log(error);
	};

	exports = function(error, data){
		var response = {};
		if(error){
			response.success = false;
			response.error = error;
			ErrorLogger(error);
		}else{
			response.success = true;
		}
		if(data) response.data = data;
		return response;
	};

  return exports;
};


module.exports = payload;
