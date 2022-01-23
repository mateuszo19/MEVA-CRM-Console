const {Router} = require("express");

const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        res.render('pages/menu');
    })

module.exports = {
    homeRouter,
}