var exports = {};
var colour = require('colour');
var figlet = require('figlet');



exports.log = function(text) {
    console.log(text);
};

exports.error = function(text) {
    console.log(text.underline.red);
};

exports.info = function(text) {
    console.log(text.green);
};

exports.warn = function(text) {
    console.log(text.yellow);
};

exports.rainbow = function(text) {
    console.log(text.rainbow);
};

exports.art = function(text) {
    console.log(figlet.textSync(text, {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }).yellow);
};


module.exports = exports;
