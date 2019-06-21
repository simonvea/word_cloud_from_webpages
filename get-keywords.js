const rp = require('request-promise-native');
const HTMLParser = require('node-html-parser');

async function getKeyWordsFromUrls(urls, htmlElement) {
    const wordCountsPerPage = [];
    for (url of urls) {
        const keyWords = await getKeyWords(url, htmlElement);
        wordCountsPerPage.push(keyWords)
    }
    return wordCountsPerPage
}

async function getKeyWords(url, htmlElement = 'body') {
    const root = await getHTML(url);
    const mainInfo = root.querySelector(htmlElement);
    if(!mainInfo) {
        class noTextError extends Error {}
        throw new noTextError
    };
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

module.exports = getKeyWordsFromUrls