const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const methodOverride = require("method-override");
const cors = require('cors')
var fs = require('fs');
const path = require('path')
const {engine} = require('express-handlebars');
app.use(cors())

let rawdata = fs.readFileSync(path.resolve(__dirname, '../data/games.json'));
let urls = JSON.parse(rawdata);

const {Router} = require("express");

const resultsRouter = Router();

resultsRouter
    .get('/cdkeys', async (req, res) => {
        const articles = []
        for(let i = 0; i < urls.length; i++){
            const gameTitle = urls[i].title;
            const ourPrice = urls[i].price;
            console.log(gameTitle)
            const url = `https://www.cdkeys.com/${urls[i].address}`;
            await axios(url)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    $('.product-info-price .price-final_price .special-price .price-final_price .price-wrapper .price', html).each(function () { //<-- cannot be a function expression
                        const title = $(this).text()
                        // const url = $(this).find('a').attr('href')
                        const gameName = gameTitle;
                        articles.push({
                            title,
                            gameName,
                            ourPrice
                        })
                    })
                    console.log(articles)
                }).catch(err => console.log(err))
        }

        res
            // .json(articles)
            .render('pages/results',{
            articles
        });
        console.log('Finally',articles)
    })
module.exports = {
    resultsRouter,
}