import { productsModel } from '../dao/models/products.js';

export const getProducts = async ({ page = 1, limit = 10, sort = null, category = null, status = null }) => {
    let query = {};

    if (category) {
        query.category = category;
    }
    if (status) {
        query.status = status;
    }

    let options = {
        page: parseInt(page),
        limit: parseInt(limit),
        lean: true,
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
    };

    try {
        let result = await productsModel.paginate(query, options);
        return result;
    } catch (err) {
        throw new Error('Failed to get products');
    }
};

export const createProduct = async ({ title, artist, price, thumbnail, code, stock, category, status }) => {
    try {
        if (!title || !artist || !price || !thumbnail || !code || !stock || !category || !status) {
            throw new Error('Missing data');
        } else {
            let product = { title, artist, price, thumbnail, code, stock, category, status };
            let result = await productsModel.create(product);
            return result;
        }
    } catch (err) {
        throw new Error('Failed to create product');
    }
};