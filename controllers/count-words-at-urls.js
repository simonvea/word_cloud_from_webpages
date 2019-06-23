const request = require('request-promise-native');
const HTMLParser = require('node-html-parser');

async function countWordsAtPages(urls, htmlElement = 'body') {
    const pages = [];
    for (let url of urls) {
        const words = await countWordsAtPage(url, htmlElement);
        pages.push(words);
    }
    const combinedCount = combineResultsFromEachUrl(pages)

    return combinedCount
}

async function countWordsAtPage(url, htmlElement = 'body') {
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
    const html = await request(url);
    const root = HTMLParser.parse(html);
    return root
}

function countWords(string) {
    const regExp = /\S+[^\W]/gi;
    const words = string.toLowerCase().match(regExp);
    const count = {};
    
    for (let word of words) {
        if(!count[word]) {count[word] = 1}
        else {count[word]++}
    }
    return count
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

module.exports = countWordsAtPages