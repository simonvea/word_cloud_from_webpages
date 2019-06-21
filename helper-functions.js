const fs = require('fs');

const commonWordsFile = fs.readFileSync('./common-words.json');
const commonWordsDefault = JSON.parse(commonWordsFile);

exports.combineCounts = (countsArray) => {
        const combinedObject = {};
        countsArray.forEach(wordsObject => {
            const words = Object.keys(wordsObject);
            for (const word of words) {
                if(!combinedObject[word]) {
                    combinedObject[word] = wordsObject[word]
                } else {
                    combinedObject[word] += wordsObject[word]
                }
            }
        })
        return combinedObject
    }

exports.removeCommonWords = (wordsObject, commonWords = commonWordsDefault) => {
        const words = Object.keys(wordsObject);
        const wordsLeft = words.map(word => {
            if (!commonWords.includes(word) && word.length > 2) {
                return word
            }
        })
        const newObject = {};
        for (const word of wordsLeft) {
            newObject[word] = wordsObject[word]
        }
        return newObject
    }

    exports.minWordCount = (minimum, wordsObject) => {
        const newObject = {};
        const words = Object.keys(wordsObject);
        for (const word of words) {
            if (wordsObject[word] >= minimum) {
                newObject[word] = wordsObject[word]
            }
        }
        return newObject
    }