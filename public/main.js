
const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const linksElement = document.querySelector('#lenker');
    const targetHTMLElement = document.querySelector('#html-element');
    const numberElement = document.getElementById("number-of-words");
    let numberOfWords = numberElement.value;
    let htmlElement = targetHTMLElement.value;
    const rawData = linksElement.value.split(",");
    const urls = cleanInput(rawData);

    if(urls.some(url => !checkIfLink(url))) {
        console.error("Feil format på lenker");
        document.getElementById('word-cloud').innerHTML = '<p> Linkene må ha gyldig format! Enten begynne på www eller http og separeres med komma!</p>';
        return
    }
    const urlsWithHttp = urls.map(url => url.startsWith("www") ? prependHttp(url): url);

    if(numberOfWords.length < 1) {numberOfWords = 10};
    if(htmlElement.length < 1) {htmlElement = 'body'}; //.import-decoration for Finn.no

    const data = {
        urls: urlsWithHttp,
        htmlElement,
    };
    console.log(data)

    getKeywords(data).then(response => {
        document.getElementById('word-cloud').innerHTML = response;
    }).catch(err => {
        console.error(err);
        document.getElementById('word.cloud').innerHTML = '<p> Beklager, men noe gikk galt :( </p>';
    })
    linksElement.value = "Legg til lenke her, separer flere lenker med komma";
    targetHTMLElement.value = "";
})

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