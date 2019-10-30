let { to, ReS, ReE } = require('./../services/utilService');
var rp = require('request-promise');

const receiveAndSend = async function(req, res) {
    var options = {
        uri: 'https://ok.fr/api',
        qs: {
            query: req.param.query
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    rp(options)
        .then(function (repos) {
            return ReS(res, repos);
        })
        .catch(function (err) {
            if (err) return ReE(res, err, 422);
        });
};
module.exports.receiveAndSend = receiveAndSend;