
module.exports = {

    combineCounts(countsArray) {
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
    },

    removeCommonWords(wordsObject) {
        const commonWords = ["vi", "du", "med", "og", "en", "er", "et", "IT", "som", "der", "til", "ogs", "jobbe", "av","har", "men", "Du", "vil", "egen","re", "din", "oss", "mer", "for", "nye", "deg", "eller", "selv", "hvor", "helt", "seg", "basert", "andre", "godt", "noe", "gjennom"]
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
    },
    minWordCount(minimum, wordsObject) {
        const newObject = {};
        const words = Object.keys(wordsObject);
        for (const word of words) {
            if (wordsObject[word] >= minimum) {
                newObject[word] = wordsObject[word]
            }
        }
        return newObject
    }
}