var _ = require('underscore');
var commons = require('../api/commons');


// The Type Ahead API.
module.exports = function(req, res) {
    var term = req.query.text.trim();

    var asciiContent; //this html element contains a newline-separated set of simpsons.
    var array = []; //let's separate and store them into this array to randmoly pick up one

    asciiContent = commons.getSimpsonRawHtml(res);
    commons.toArray(array, asciiContent);

    if (array.length == 0) {
        res.json([{
            title: '<i>(no results)</i>',
            text: ''
        }]);
    } else {
        res.json(
            _.map(array, function(element, k) {
                return {
                    title: '<pre> ' + array[k] + '</pre>',
                    text: k
                }
            })
        );
    }
};