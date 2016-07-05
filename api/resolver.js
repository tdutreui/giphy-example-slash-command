

// The API that returns the in-email representation.
module.exports = function(req, res) {
	    res.json({
        body: '<img style="max-width:100%;" src="https://latex.codecogs.com/gif.latex?' + req.query.text.trim() + '"/>'
    });
};

