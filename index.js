'use strict'

const getKeyWordsFromUrls = require('./get-keywords');
const helpers = require('./helpers')
const urls = require('./urls.json');
const htmlElement = ".import-decoration"

getKeyWordsFromUrls(urls, htmlElement).then(wordCounts => {
    const wordCountTotal = helpers.combineCountsFromArray(wordCounts);
    const cleanedWordCount = helpers.getRelevantKeyWords(wordCountTotal);
    console.log(cleanedWordCount);
}).catch(error => console.log(error));


