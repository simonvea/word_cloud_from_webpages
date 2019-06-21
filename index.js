'use strict'

const fs = require('fs');
const getKeyWordsFromEachUrl = require('./get-keywords');
const helpers = require('./helper-functions')

const urlFile = fs.readFileSync('./urls.json');
const urls = JSON.parse(urlFile);

const options = {
    urls,
    commonWords: [],
    minNumberOfWords: 2
}

getKeyWordsFromEachUrl(urls).then(wordCounts => {
   const wordCountTotal = helpers.combineCounts(wordCounts);
   const relevantWords = helpers.removeCommonWords(wordCountTotal);
   const minNumberOfWords = 2;
   const cleanedWordCount = helpers.minWordCount(minNumberOfWords, relevantWords);
    console.log(cleanedWordCount);
}).catch(error => console.log(error));

