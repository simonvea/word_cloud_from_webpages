const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

const staticFolder = 'public'

app.use(express.static(staticFolder));

app.use(routes)

app.listen(port, () => console.log(`Listening on port ${port}!`))
