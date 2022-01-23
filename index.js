const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const cors = require('cors')
var fs = require('fs');
const path = require('path');
const {homeRouter} = require("./routers/home");
const {resultsRouter} = require("./routers/results");
const hbs = require('express-handlebars');

app.use(cors());
app.use(express.static('public'));
app.use(methodOverride());
app.use(express.urlencoded({
    extended: true,
}));

app.set('view engine', '.hbs');

app.engine('.hbs', hbs({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
}));


app.use('/', homeRouter);

app.use('/results', resultsRouter)



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

