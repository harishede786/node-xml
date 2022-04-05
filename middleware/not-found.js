const notFound = (req, res) => res.status(404).send('route not exist');
module.exports = notFound;