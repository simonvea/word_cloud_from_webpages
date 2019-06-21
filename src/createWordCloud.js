module.exports = createWordCloud

const helpers = require('../helpers');

function createWordCloud(wordsObject, numberOfWords = 10) {

    const groupedWords = helpers.groupWordsByCount(wordsObject);
    const sortedWords = sortWords(groupedWords); //sorted low to high
    const mostCountedWords = [];
    let numberOfAddedWords = 0;

    for (let i = 0; i <= numberOfWords; i++) {
        const index = sortedWords.length -1 -i;
        mostCountedWords.unshift(sortedWords[index]);
        numberOfAddedWords += sortedWords[index].words.length;
        if (numberOfAddedWords >= numberOfWords) {break}
    }

    const options = {
        minSize: 10,
        maxSize: 20,
        array: mostCountedWords
    }

    const wordsWithSize = addSize(options);

    const html = wordsWithSize.map(wordsObject => {
        const wordElements = wordsObject.words.map(word => {
            return `<span style="font-size: ${wordsObject.size}px">${word}</span>`
        })
        return wordElements.join(" ")
    }).join("<br>")

    return html
}

function sortWords(wordsObject) {
    return wordsObject.sort((a,b) => a.count > b.count ? 1 : -1)
}

function addSize({minSize, maxSize, array}) {
     return array.map((words, index) => {
        const multiplier = (index / array.length).toFixed(2)
        const size = minSize + multiplier * maxSize;
        return {size, ...words}
     })
}

