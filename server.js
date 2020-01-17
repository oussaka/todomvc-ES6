const express = require('express');
const app = express();
const path = require('path');
const noSniff = require('dont-sniff-mimetype');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(noSniff());

app.listen(process.env.PORT || 3000, function() {
    console.log('Your node js server is running');
});