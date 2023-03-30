import { productsModel } from '../dao/models/products.js';

const getProducts = async (req, res) => {
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
        let response = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? result.prevPage : null,
            nextPage: result.hasNextPage ? result.nextPage : null,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : null
        };
        res.json(response);
    } catch (err) {
        console.log(err);
        let response = {
            status: 'error',
            message: err.message,
        };
        res.status(500).json(response);
    }
};

const createProduct = async (req, res) => {
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
};

export default { 
    getProducts, 
    createProduct
};