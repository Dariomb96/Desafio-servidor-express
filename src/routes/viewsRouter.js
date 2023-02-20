const express = require('express');
const viewsRouter = express.Router();
const { productsModel } = require('../models/products');

viewsRouter.get('', async (req, res) => {
    try {
        let products = await productsModel.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

viewsRouter.get('/products', async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let sort = req.query.sort || null;
    let query = {};

    if (req.query.category) {
        query.category = req.query.category;
    }
    if (req.query.status) {
        query.status = req.query.status;
    }

    let options = {
        page: page,
        limit: limit,
        lean: true,
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
    };

    try {
        let result = await productsModel.paginate(query, options);
        result.prevLink = result.hasPrevPage
            ? `http://localhost:8080/products?page=${result.prevPage}`
            : '';
        result.nextLink = result.hasNextPage
            ? `http://localhost:8080/products?page=${result.nextPage}`
            : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        result.sortAsc = sort === null || sort === 'asc';
        result.sortLink = sort ? `&sort=${sort}` : '';
        res.render('products', result);
    } catch (err) {
        console.log(err);
        res.render('error');
    }
});


viewsRouter.post('', async (req, res) => {

    try {
        let { title, artist, price, thumbnail, code, stock, category, status } = req.body;
        if (!title || !artist || !price || !thumbnail || !code || !stock || !category || !status) {
            res.status(400).json({ error: 'Missing data' });
            return;
        } else {
            let product = { title, artist, price, thumbnail, code, stock, category, status };
            let result = await productsModel.create(product);
            res.status(200).json({ result: "success", payload: result });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = {
    viewsRouter,
}