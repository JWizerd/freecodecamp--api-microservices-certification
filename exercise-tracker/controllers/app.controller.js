const index = function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
};

module.exports = { index };