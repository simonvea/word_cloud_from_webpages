import createCloud from './createCloud.js'
import getDataFromForm from './getDataFromForm.js'

const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const data = getDataFromForm();
        console.log(data);

        getKeywords(data).then(data => {
            const sortedWords = sortWords(data); //sorted low to high
           // const mostCountedWords = getTopWords(sortedWords); may implement later
              
            const sizeOptions = {
                minSize: 20,
                maxSize: 90,
                array: sortedWords
            }

            const wordsWithSize = addSize(sizeOptions);
            const wordsWithColor = addColorToEachWord(wordsWithSize);
            const flattenedArray = flattenArray(wordsWithColor);

            createCloud(flattenedArray)

        }).catch(err => {
            console.error(err);
            document.getElementById('word.cloud').innerHTML = '<p> Beklager, men noe gikk galt :( </p>';
        })
        document.getElementById('lenker').value = "Legg til lenke her, separer flere lenker med komma";
        document.querySelector('#html-element').value = "";

    } catch(err) {
        console.error("Feil format på lenker", err);
        document.getElementById('word-cloud').innerHTML = '<p> Linkene må ha gyldig format! Enten begynne på www eller http og separeres med komma!</p>';
    }
})

async  function getKeywords(data) {
    const url = '/keywords';
    const init = {
        method: "POST",
        headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, init);
    const keywords = await response.json();

    return keywords
}

function sortWords(wordsObject) {
    return wordsObject.sort((a,b) => a.count > b.count ? 1 : -1)
  }
  
  function getTopWords(sortedWords, numberOfWords=100) {
    const mostCountedWords = [];
    let numberOfAddedWords = 0;
  
    for (let i = 0; i <= sortedWords.length; i++) {
        const index = sortedWords.length -1 -i;
        mostCountedWords.unshift(sortedWords[index]);
        numberOfAddedWords += sortedWords[index].words.length;
        if (numberOfAddedWords >= numberOfWords) {break}
    }
    return mostCountedWords
  }
  
  function addSize({minSize, maxSize, array}) {
     return array.map((words, index) => {
        const multiplier = (index / array.length).toFixed(2)
        const size = minSize + multiplier * maxSize;
        return {size, ...words}
     })
  }

  function addColorToEachWord(words) {
    const wordsWithColor = words.map(place => {
        return  place.words.map(word => {
              return {text: word, size: place.size, fill: getRandomColor()}
          })
      })
      return wordsWithColor
  }

function flattenArray(arrayOfArrays) {
    const flattened = [];
    for(const array of arrayOfArrays) {
        flattened.push(...array)
    }
    return flattened
}

  function getRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + color.padStart(6,"0")
  }