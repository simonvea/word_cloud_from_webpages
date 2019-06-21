
const commonWordsDefault = require('./common-words.json')

module.exports = {
    combineResultsFromEachUrl,
    getRelevantKeyWords,
    groupWordsByCount
}

function groupWordsByCount(wordsObject) {
    const words = Object.keys(wordsObject);
    const grouped = [];
    
    for (word of words) {
        const number = wordsObject[word];
        const index = indexOfNumber(number, grouped)
        if(index != -1) {
            grouped[index].words.push(word)
        } else {
            grouped.push({count: number, words: [word]})
        }
    }

    return grouped
}

function indexOfNumber(number, array) {
    return array.findIndex(object => object.count == number)
}

function combineResultsFromEachUrl(pages) {
    const result = {};
    pages.forEach(page => {
        const words = Object.keys(page);
        for (const word of words) {
            if(!result[word]) {
                result[word] = page[word]
            } else {
                result[word] += page[word]
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
        if (!wordsToRemove.includes(word) && word.length > 2 && word != undefined) {
            return word
        }
    })
    const newObject = {};
    for (const word of wordsLeft) {
        if(word != undefined) {
            newObject[word] = wordsObject[word]
        }
        
    }
    return newObject
}

