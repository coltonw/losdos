exports.get = function(req, res) {
    res.json({route: 'routes/stuff/mockstuff.js#put.index'});
};

exports.view = function(req, res) {
    res.send('routes/stuff/mockstuff.js#view');
};

exports.put = {
    index: function(req, res) {
        res.json({route: 'routes/stuff/mockstuff.js#put.index', success: true});
    },
    otherstuff: function(req, res) {
        res.json({route: 'routes/stuff/mockstuff.js#put.otherstuff', success: true});
    }
};