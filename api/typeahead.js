
// The Type Ahead API.
module.exports = function(req, res) {
    var term = req.query.text.trim();
    if (!term) {
        res.json([{
            title: '<i>(enter a search term)</i>',
            text: ''
        }]);
        return;
    }

    if (term.length == 0) {
        res.json([{
            title: '<i>(no results)</i>',
            text: ''
        }]);
    } else {
        res.json([{
            title: '<img style="height:75px" src="https://latex.codecogs.com/gif.latex?' + term + '">',
            text: term
        }]);
    }
};