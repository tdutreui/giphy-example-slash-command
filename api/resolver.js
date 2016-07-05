var commons = require('../api/commons');


// The API that returns the in-email representation.
module.exports = function(req, res) {
    var term = req.query.text.trim();

    getSimpson(res, term);
};

function getSimpson(res, term) {

    var asciiContent; //this html element contains a newline-separated set of simpsons.
    var array = []; //let's separate and store them into this array to randmoly pick up one
    asciiContent = commons.getSimpsonRawHtml(res);
    commons.toArray(array, asciiContent);

    //final output with <pre> to handle whitespace chars
    if (term && (term % 1) === 0) {
        html = '<pre>' + array[term] + '</pre>';
    } else {
        html = '<pre>' + array[Math.floor(Math.random() * array.length)] + '</pre>';
    }

    res.json({
        body: html
            // Add raw:true if you're returning content that you want the user to be able to edit
    });
}