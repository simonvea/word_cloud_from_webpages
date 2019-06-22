'use strict'

const getKeyWordsFromUrls = require('./get-keywords');
const helpers = require('./helpers');
const express = require('express');

const wordsFetched = []

//Server
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json())
app.post('/keywords', (req, res) => {
    const urls = req.body.urls;
    const htmlElement = req.body.htmlElement;
    console.log(req.body);
    getKeyWordsFromUrls(urls, htmlElement)
        .then(wordCounts => {
            const wordCountTotal = helpers.combineResultsFromEachUrl(wordCounts);
            const cleanedWordCount = helpers.getRelevantKeyWords(wordCountTotal);
            const groupedWords = helpers.groupWordsByCount(cleanedWordCount);
            wordsFetched.push(groupedWords);
            res.json(groupedWords)
        }).catch(error => {
            //res.send()
            console.log(error)
        });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
