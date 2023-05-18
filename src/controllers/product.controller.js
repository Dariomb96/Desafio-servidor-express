import { getProducts, createProduct } from '../dao/repositories/productRepository.js';

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: The sorting criteria
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category of products to filter
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: The status of products to filter
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalPages:
 *                   type: integer
 *                 prevPage:
 *                   type: integer
 *                 nextPage:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 hasPrevPage:
 *                   type: boolean
 *                 hasNextPage:
 *                   type: boolean
 *                 prevLink:
 *                   type: string
 *                 nextLink:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export const createProductController = async (req, res) => {
    let { title, artist, price, thumbnail, code, stock, category, status } = req.body;

    try {
        let result = await createProduct({ title, artist, price, thumbnail, code, stock, category, status });
        res.status(200).json({ result: "success", payload: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};