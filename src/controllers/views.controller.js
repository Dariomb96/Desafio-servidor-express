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
};

export default getProducts;