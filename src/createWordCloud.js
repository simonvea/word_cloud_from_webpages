module.exports = createWordCloud

const helpers = require('../helpers');

function createWordCloud(wordsObject, numberOfWords = 10) {
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
    const wordsWithPosition = addPosition(wordsWithSize);

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

function addPosition(wordsObject) {

  const wordObject = {
      word,
      z: size,
      x: 10,
      y: 50
  }


    //Høyest size i midten
    //hvert ord trenger en posisjon på x og y aksen
    //hvis parent element er position relative, så kan hvert ord ha position absolute med top: x px, left: y px, for eksempel! (og z-index)
    //må da finne midten
    //det er en boks
    //men ordene bør flytte seg i en ellipse for å kunne være en sky, de kan overlappe
    //men de bør for hvert layer har en unik posisjon
    //starte med å fylle bakgrunn, så fylle på resten
    //det betyr at de største ordene også bør ha en høyere z-index!
    //animere skya? at ordene flyter rundt liksom? ... da bør det lages i Canvas..


}

