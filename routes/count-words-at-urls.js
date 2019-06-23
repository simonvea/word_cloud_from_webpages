const express = require('express')
const countWordsAtUrls = require('../controllers/count-words-at-urls');

const route = express.Router();

route.use(express.json());
route.post('/',
  async (req, res, next) => {
    const urls = req.body.urls;
    const htmlElement = req.body.htmlElement;

    const words =  await countWordsAtUrls(urls, htmlElement)

    return res.send(words)
  })

module.exports = route
