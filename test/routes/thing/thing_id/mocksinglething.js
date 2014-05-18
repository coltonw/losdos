exports.thing_id = function(req, res, next, id) {
    req.thing = 'routes/thing/thing_id/mocksinglething.js#thing_id:' + id;
    next();
};

exports.index = function(req, res) {
    res.json({route: 'routes/thing/thing_id/mocksinglething.js#index', thing: req.thing});
};

exports.delete = function(req, res) {
    res.json({route: 'routes/thing/thing_id/mocksinglething.js#delete', thing: req.thing});
};

exports.post = function(req, res) {
    res.json({route: 'routes/thing/thing_id/mocksinglething.js#post', thing: req.thing});
};