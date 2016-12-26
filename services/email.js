var email = function(db, logger, config, exports) {

    var sendgrid = require("sendgrid")(config.sendgrid);
    var ejs = require('ejs');
    var juice = require('juice');
    var templates = __dirname + '/../views/emails/';


    exports.sendMail = sendMail = function(too, subject, html) {
        var request = sendgrid.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: {
                personalizations: [{
                    to: [{
                        email: too,
                    }, ],
                    subject: subject,
                }, ],
                from: {
                    email: config.email,
                    name: 'Fire Captain'
                },
                content: [{
                    type: 'text/html',
                    value: html,
                }, ],
            },
        });
        return sendgrid.API(request);
    };

    exports.renderEmail = renderEmail = function(template, vars) {
        return new Promise(function(fufill, reject) {
            ejs.delimiter = '%';
            ejs.renderFile(templates + template + '.ejs', vars, {}, function(err, rendered) {
                if (err) return reject(err);
                juice.juiceResources(rendered, {
                    webResources: {
                        images: false
                    }
                }, function(err, rendered) {
                    if (err) return reject(err);
                    fufill(rendered);
                });
            });
        }).catch(function(err) {
            console.log(err);
        });
    };

    exports.renderAndSend = function(too, subject, vars, template) {
        vars.too = too;
        vars.subject = subject;
        return renderEmail(template, vars).then(function(html) {
            return sendMail(too, subject, html);
        });
    };


    return exports;
};


module.exports = email;
