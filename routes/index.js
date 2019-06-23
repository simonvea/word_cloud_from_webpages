
const Router = require('express').Router();

Router.use('/count-words-at-urls', require('./count-words-at-urls'));

module.exports = Router