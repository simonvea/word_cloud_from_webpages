'use strict'

const createWordCloud = require('./src/createWordCloud')
const getKeyWordsFromUrls = require('./get-keywords');
const helpers = require('./helpers');
const express = require('express');

//Server
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json())
app.post('/keywords', (req, res) => {
    const urls = req.body.urls;
    const htmlElement = req.body.htmlElement;
    getKeyWordsFromUrls(urls, htmlElement)
        .then(wordCounts => {
            const wordCountTotal = helpers.combineResultsFromEachUrl(wordCounts);
            const cleanedWordCount = helpers.getRelevantKeyWords(wordCountTotal);
            const html = createWordCloud(cleanedWordCount);
            res.send(html)
        }).catch(error => console.log(error));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
