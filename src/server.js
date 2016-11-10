const express = require('express');
const app = express();

app.use(express.static('./src'));
app.use(express.static('./build'));

app.listen(3000, () => console.log('connected to 3000'));

module.exports = app;