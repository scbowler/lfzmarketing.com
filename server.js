const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./router');
const config = require('./config');
const ENV = process.env.ENV || 'dev';
const PORT = process.env.PORT || ENV === 'production' ? 80 : 4000;

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/lfzmarketing', {
    useMongoClient: true
});

require('./services/firebase_init');

const studentFileName = 'student_data';

if(ENV === 'production'){
    app.use((req, res, next) => {
        if(req.secure) return next();

        res.redirect('https://' + req.headers.host + req.url);
    });
}

app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

router(app);

app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
});

if(ENV === 'production'){
    https.createServer(config.ssl, app).listen(443);
}
