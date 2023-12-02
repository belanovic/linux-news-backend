const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
////////// const HOST_BACKEND = require('./hostBackend.js');
const app = express();
const server = http.createServer(app);
const routerArticles = require('./routes/allArticles');
const article = require('./routes/oneArticle');
const frontpageArticles = require('./routes/frontpageArticles');
const frontpageUpdate = require('./routes/frontpageUpdate');
const articlePosition = require('./routes/articlePosition');
const newsByCategory = require('./routes/newsByCategory');
const publishArticle = require('./routes/publishArticle');
const proba = require('./routes/proba');
const oneUserFE = require('./routes/oneUserFE');
const authUserFE = require('./routes/authUserFE');
const config = require('config');
const newsByDate = require('./routes/newsByDate');
const scraper = require('./routes/scraper');
const twitter = require('./routes/twitter');
const cookieParser = require('cookie-parser');
const profileImg = require('./routes/profileImg.js');



if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const mongoAddress1 = `mongodb://localhost/news`;
const mongoAddress2 = `mongodb+srv://goranbelanovic:1234@cluster0.xneom.mongodb.net/news?retryWrites=true&w=majority`;

app.use(function (req, res, next) {  

        // Request headers you wish to allow
    /* res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); */
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
   
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json({
        type: ['application/json', 'text/plain'],
        limit: '50mb'
    }));
app.use(express.urlencoded({extended: true}));

mongoose.set('useFindAndModify', false);


app.use('/', routerArticles);
app.use('/', article);
app.use('/', frontpageArticles);
app.use('/', articlePosition);
app.use('/', newsByCategory);
app.use('/', proba);
app.use('/', publishArticle);
app.use('/', oneUserFE);
app.use('/', authUserFE);
app.use('/', newsByDate);
app.use('/', frontpageUpdate);
app.use('/', scraper);
app.use('/', twitter);
app.use('/', profileImg);
app.use(cookieParser());   

////////// Add headerss

mongoose.connect(mongoAddress2, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the news database'))
    .catch(err => console.log(err)) 

process.env.TZ = "Europe/Belgrade";
const HOST_BACKEND = process.env.HOST_BACKEND || 'localhost';
const port = process.env.PORT || 4000;



server.listen(port, HOST_BACKEND, () => console.log(`Server is listening on port ${port}`));