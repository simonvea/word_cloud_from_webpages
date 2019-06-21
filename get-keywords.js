const rp = require('request-promise-native');
const HTMLParser = require('node-html-parser');

async function getKeyWordsFromEachUrl(urls) {
    const wordCountsPerPage = [];
    for (url of urls) {
        const keyWords = await getKeyWords(url);
        wordCountsPerPage.push(keyWords)
    }
    return wordCountsPerPage
}

async function getKeyWords(url) {
    const root = await getHTML(url);
    const mainInfo = root.querySelector(".import-decoration");
    const text = mainInfo.rawText;
    const words = countWords(text);
    return words
}

async function getHTML(url) {
    const html = await rp(url);
    const root = HTMLParser.parse(html);
    return root
}

function countWords(string) {
    const regExp = /\b\w+\b/gi;
    const words = string.match(regExp);
    const count = {}
    for (let word of words) {
        if(!count[word]) {count[word] = 1}
        else {count[word]++}
    }
    return count
}

module.exports = getKeyWordsFromEachUrl