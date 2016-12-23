module.exports = function(io, services) {

    var socketioJwt = require("socketio-jwt");

    io.use(socketioJwt.authorize({
        secret: services.config.jwtSecret,
        handshake: true
    }));

    io.on('connection', function(socket) {
        // in socket.io < 1.0
        console.log('hello!', socket.handshake.decoded_token.name);

        // in socket.io 1.0
        console.log('hello! ', socket.decoded_token.name);
    });

    return;
};
