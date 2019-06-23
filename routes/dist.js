const path = require('path');

app.get('/dist/:name', (req, res) => {
    const options = {
        root: path.join(__dirname, 'dist'),
    }
    const fileName = req.params.name;

    res.sendFile(fileName, options, (err) => {
        if (err) {next(err)}
        else {console.log('Sent:', fileName)}
    })
})
