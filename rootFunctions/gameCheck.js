const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')
const articlesX = [];

const checkGame = async (game) => {
    const articles = []
    const gameTitle = game.title;
    const ourPrice = game.price;
    console.log(gameTitle);
    const url = `https://www.cdkeys.com/${game.address}`;
    await axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('.product-info-price .price-final_price .special-price .price-final_price .price-wrapper .price', html).each(function () { //<-- cannot be a function expression
                const title = parseFloat($(this).text().substr(3, 7));
                // const url = $(this).find('a').attr('href')
                const gameName = gameTitle;
                const priceDifference = title - ourPrice;
                articles.push({
                    title,
                    gameName,
                    ourPrice,
                    priceDifference,
                    url
                })
            })
        }).catch(err => console.log(err))
    return  articles;
}
const x = {
    title: "The Sims 4 Witaj w pracy",
    shop: "cdkeys",
    address: "assassins-creed-origins-gold-edition-pc-uplay-cd-key",
    allegro: 11793746707,
    price: 66.69
};

const gameA = checkGame(x).then(x => {
    articlesX.push(x);
    console.log(articlesX);
});





