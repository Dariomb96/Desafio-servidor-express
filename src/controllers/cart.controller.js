import CartManager from '../dao/classes/DBManager.js';

const CartsManager = new CartManager();

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all carts
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: A list of carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
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
const getCarts = async (req, res) => {
    try {
        const limit = req.query.limit;
        res.send(await CartsManager.getCarts(limit));
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}:
 *   get:
 *     summary: Get a cart by ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: A single cart object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const getCartsById = async (req, res) => {
    try {
        const id = req.params.cid;
        res.send(await CartsManager.getCartById(id));
    } catch (err) {
        res.status(500).send("Cart not found");
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Add a new cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: The created cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
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
const addCart = async (req, res) => {
    try {
        const arr = req.body;
        const cart = await CartsManager.addCart(arr);
        res.send({ message: "Cart successfully added", cart });
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}/products/{pid}:
 *   put:
 *     summary: Add a product to the cart or increase its quantity
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 acknowledged:
 *                   type: boolean
 *       500:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const updateCartProducts = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await CartsManager.updateCartProducts(cid, pid);
        res.send({
            message: "Products in cart successfully updated",
            acknowledged: result.acknowledged,
        });
    } catch (err) {
        res.status(500).send("Cart not found");
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}:
 *   delete:
 *     summary: Delete a cart
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: The deletion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 acknowledged:
 *                   type: boolean
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
const deleteCart = async (req, res) => {
    try {
        const id = req.params.cid;
        const result = await CartsManager.deleteCart(id);
        res
            .status(200)
            .send({ message: "Cart deleted", acknowledged: result.acknowledged });
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}/products/{pid}:
 *   delete:
 *     summary: Delete a product from a cart
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The deletion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 acknowledged:
 *                   type: boolean
 *       500:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const deleteCartProduct = async (req, res) => {
    try {
        const id = req.params.cid;
        const pid = req.params.pid;
        const result = await CartsManager.deleteCartProduct(id, pid);
        res
            .status(200)
            .send({ message: "Product deleted", acknowledged: result.acknowledged });
    } catch (err) {
        res.status(500).send("Product not found");
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}:
 *   put:
 *     summary: Update the products in a cart
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CartProduct'
 *     responses:
 *       200:
 *         description: The updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 acknowledged:
 *                   type: boolean
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
const updateCart = async (req, res) => {
    try {
        const id = req.params.cid;
        const products = req.body;
        const result = await CartsManager.updateCart(id, products);
        res.status(200).send({
            message: "Cart products updated",
            acknowledged: result.acknowledged,
        });
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}/products/{pid}/quantity:
 *   put:
 *     summary: Update the quantity of a product in a cart
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *        200:
 *          description: The updated cart
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  acknowledged:
 *                    type: boolean
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */
const updateProductQuantity = async (req, res) => {
    try {
        const id = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body;
        const result = await CartsManager.updateProductQuantity(id, pid, quantity);
        res.status(200).send({
            message: "Product quantity updated",
            acknowledged: result.acknowledged,
        });
    } catch (err) {
        res.status(500).send("Product not found");
        const error = err.message;
        console.log(error);
    }
};

/**
 * @swagger
 * /carts/{cid}/products:
 *   delete:
 *     summary: Delete all products from a cart
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: The deletion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 acknowledged:
 *                   type: boolean
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
const deleteAllCartProducts = async (req, res) => {
    try {
        const id = req.params.cid;
        const result = await CartsManager.deleteCartProducts(id);
        res
            .status(200)
            .send({ message: "Products deleted", acknowledged: result.acknowledged });
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message;
        console.log(error);
    }
};

const purchaseCart = async (req, res) => {
    try {
        const cartId = req.body.cartId;

        const cart = await cartsModel.findById(cartId).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Verificar si el carrito ya ha sido comprado
        if (cart.purchased) {
            return res.status(400).json({ message: 'El carrito ya ha sido comprado' });
        }

        // Obtener los productos del carrito
        const products = cart.products;

        // Verificar si hay suficiente stock para cada producto
        for (const item of products) {
            const product = item.product;
            const quantity = item.quantity;

            const productFromDB = await productsModel.findById(product);

            if (!productFromDB) {
                return res.status(404).json({ message: `Producto no encontrado para el ID ${product}` });
            }

            if (productFromDB.stock < quantity) {
                return res.status(400).json({ message: `Stock insuficiente para el producto ${productFromDB.name}` });
            }
        }

        // Realizar la compra
        for (const item of products) {
            const product = item.product;
            const quantity = item.quantity;

            // Actualizar el stock del producto
            await productsModel.updateOne({ _id: product }, { $inc: { stock: -quantity } });
        }

        // Actualizar el estado del carrito a "purchased"
        await cartsModel.updateOne({ _id: cartId }, { purchased: true });

        res.json({ message: 'Compra realizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la compra' });
    }
}

export default {
    getCarts,
    getCartsById,
    addCart,
    updateCartProducts,
    deleteCart,
    deleteCartProduct,
    updateCart,
    updateProductQuantity,
    deleteAllCartProducts,
    purchaseCart
};