var sync = require('synchronize');
var request = require('request');
var xmldom = require('xmldom');
var DOMParser = xmldom.DOMParser;
var XMLSerializer = xmldom.XMLSerializer;


// The API that returns the in-email representation.
module.exports = {

    //getting raw simpsons ascii art
    getSimpsonRawHtml: function(res) {
        var response;
        var html;
        try {
            response = sync.await(request({
                url: 'http://chris.com/ascii/index.php?art=cartoons/simpsons',

                timeout: 15 * 1000
            }, sync.defer()));
        } catch (e) {
            res.status(500).send('Exception: ' + e);
            return;
        }

        var document = new DOMParser().parseFromString(response.body, 'text/html');
        var element = document.getElementsByTagName('pre');

        return new XMLSerializer().serializeToString(element);
    },

    //split-and-store algorithm
    toArray: function(array, asciiContent) {
        var k = 0; //array index
        var i = 0; //begin newline search index


        while (i < asciiContent.length) {
            var j = asciiContent.indexOf("\n\n", i);
            if (j == -1) j = asciiContent.length;
            var asciiElement = asciiContent.substr(i, j - i);

            //filter useless comments and empty lines
            if (asciiElement.length >= 30) {
                array[k] = asciiElement;
                k++;
            }

            i = j + 1;
        }
    }
};