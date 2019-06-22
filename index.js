'use strict'

const getKeyWordsFromUrls = require('./getKeywords/get-keywords');
const helpers = require('./getKeywords/helpers');
const express = require('express');
const path = require('path');
const { createCanvas, loadImage } = require('canvas')

const wordsFetched = []

//Server
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/dist/:name', (req, res) => {
    const options = {
        root: path.join(__dirname, 'src'),
    }
    const fileName = req.params.name;

    res.sendFile(fileName, options, (err) => {
        if (err) {next(err)}
        else {console.log('Sent:', fileName)}
    })
})

app.use(express.json())

app.post('/keywords', (req, res) => {
    const urls = req.body.urls;
    const htmlElement = req.body.htmlElement;
    console.log(req.body);
    getKeyWordsFromUrls(urls, htmlElement)
        .then(wordCounts => {
            const wordCountTotal = helpers.combineResultsFromEachUrl(wordCounts);
            const cleanedWordCount = helpers.getRelevantKeyWords(wordCountTotal);
            const groupedWords = helpers.groupWordsByCount(cleanedWordCount);
            wordsFetched.push(groupedWords);
            res.json(groupedWords)
        }).catch(error => {
            //res.send()
            console.log(error)
        });
})

app.post('/wordcloud', (req, res) => {
    const words = req.body;
    //const cloud = createCloud(words);

    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d')

    ctx.font = '30px Impact'
    ctx.rotate(0.1)
    ctx.fillText('Awesome!', 50, 100)
    
    // Draw line under text
    var text = ctx.measureText('Awesome!')
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()

    console.log(canvas)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
