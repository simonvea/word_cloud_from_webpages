'use strict'

const getKeyWordsFromUrls = require('./get-keywords');
const helpers = require('./helpers');
const express = require('express');

//Server
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json())
app.post('/keywords', (req, res) => {
    const data = req.body;
    const urls = req.body.urls;
    const htmlElement = req.body.htmlElement;
    getKeyWordsFromUrls(urls, htmlElement)
        .then(wordCounts => {
            const wordCountTotal = helpers.combineCountsFromArray(wordCounts);
            const cleanedWordCount = helpers.getRelevantKeyWords(wordCountTotal);
            res.send(cleanedWordCount)
        }).catch(error => console.log(error));
    console.log(data);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
