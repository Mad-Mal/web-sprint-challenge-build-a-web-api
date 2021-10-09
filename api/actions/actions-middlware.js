const Actions = require('./actions-model.js');

function logger(req, res, next) {
    console.log(`${req.method}, ${req.path}, ${Date.now()}`);
    next();
};

module.exports = {
    logger,
}