
const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const linksElement = document.querySelector('#lenker');
    const targetHTMLElement = document.querySelector('#html-element');
    const htmlElement = targetHTMLElement.value;
    const rawData = linksElement.value.split(",");
    const urls = cleanInput(rawData);

    if(urls.some(url => !checkIfLink(url))) {
        document.getElementById('response').innerHTML = '<p> Linkene må ha gyldig format! Enten begynne på www eller http og separeres med komma!</p>';
        return
    }
    const urlsWithHttp = urls.map(url => url.startsWith("www") ? prependHttp(url): url);
    const data = {urlsWithHttp, htmlElement};
    console.log(data)

    // sendData(data).then(response => {
    //     document.getElementById('response').innerHTML = response;
    // }).catch(err => {
    //     console.error(err);
    //     document.getElementById('response').innerHTML = '<p> Beklager, men noe gikk galt :( </p>';
    // })
    linksElement.value = "Legg til lenke her, separer flere lenker med komma";
    targetHTMLElement.value = "";
})

function cleanInput(data) {
    return data.map(line => {
        return line.replace("\n", "").trim().toLowerCase()
    })
}

function checkIfLink(link) {
    const linkRegExp = /^(http:\/\/)?www\.\w+\.\w+$/;
    return linkRegExp.test(link);
}

function prependHttp(url) {
    return "http://" + url
}

async  function sendData(data) {
    const url = '/keywords';
    const init = {
        method: "POST",
        headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, init);
    const html = await response.text();

    return html
}