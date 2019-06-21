
const commonWordsDefault = require('./common-words.json')

module.exports = {
    combineCountsFromArray,
    getRelevantKeyWords
}

function combineCountsFromArray(counts) {
    const result = {};
    counts.forEach(wordsObject => {
        const words = Object.keys(wordsObject);
        for (const word of words) {
            if(!result[word]) {
                result[word] = wordsObject[word]
            } else {
                result[word] += wordsObject[word]
            }
        }
    })
    return result
}

function getRelevantKeyWords(keywords, options = {minNumberOfWords: 2, wordsToRemove: commonWordsDefault}) {
    const wordsWithoutLowCount = getWordsWithMin(keywords, options.minNumberOfWords)
    const wordsWithoutWords = removeWords(wordsWithoutLowCount, options.wordsToRemove);
    return wordsWithoutWords
}

function getWordsWithMin(wordsObject, minimum) {
    const newObject = {};
    const words = Object.keys(wordsObject);
    for (const word of words) {
        if (wordsObject[word] >= minimum) {
            newObject[word] = wordsObject[word]
        }
    }
    return newObject
}

function removeWords(wordsObject, wordsToRemove) {
    const oldWords = Object.keys(wordsObject);
    const wordsLeft = oldWords.map(word => {
        if (!wordsToRemove.includes(word) && word.length > 2) {
            return word
        }
    })
    const newObject = {};
    for (const word of wordsLeft) {
        newObject[word] = wordsObject[word]
    }
    return newObject
}

