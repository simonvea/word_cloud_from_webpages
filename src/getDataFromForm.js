export default () => {
    const linksElement = document.getElementById('lenker');
    const targetHTMLElement = document.querySelector('#html-element');
    const numberElement = document.getElementById("number-of-words");

    let htmlElement = targetHTMLElement.value;
    let numberOfWords = numberElement.value;
    const rawData = linksElement.value.split(",");
    
    const urls = cleanInput(rawData);

    if(urls.some(url => !checkIfLink(url))) {
        class inputUrlError extends Error {}
        throw new inputUrlError
    }
    const urlsWithHttp = urls.map(url => url.startsWith("www") ? prependHttp(url): url);

    if(numberOfWords.length < 1) {numberOfWords = 100};
    if(htmlElement.length < 1) {htmlElement = 'body'}; //.import-decoration for Finn.no

    const data = {
        urls: urlsWithHttp,
        htmlElement,
    };
    return data
}

function cleanInput(data) {
    return data.map(line => {
        return line.replace("\n", "").trim().toLowerCase()
    })
}

function checkIfLink(link) {
    const linkRegExp = /^(https?:\/\/)?www\.\w+\.\w+/;
    return linkRegExp.test(link);
}

function prependHttp(url) {
    return "http://" + url
}