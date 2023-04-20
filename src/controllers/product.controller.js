import { getProducts, createProduct } from '../repository/productsRepository.js';

export const getProductsController = async (req, res) => {
    let { page, limit, sort, category, status } = req.query;

    try {
        let result = await getProducts({ page, limit, sort, category, status });
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

export const createProductController = async (req, res) => {
    let { title, artist, price, thumbnail, code, stock, category, status } = req.body;

    try {
        let result = await createProduct({ title, artist, price, thumbnail, code, stock, category, status });
        res.status(200).json({ result: "success", payload: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};