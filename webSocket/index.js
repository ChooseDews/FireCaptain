module.exports = function(io, services){

io.on('connection', function (socket) {

		console.log('We have a connection!');
		console.log(socket);

});


	return;
};
