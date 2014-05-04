exports.get = function(req, res) {
	res.json({id: 'stuff1'})
};

exports.view = function(req, res) {
	res.send('hello');
}