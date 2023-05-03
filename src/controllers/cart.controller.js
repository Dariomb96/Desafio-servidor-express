import  CartManager  from '../dao/classes/DBManager.js';

const CartsManager = new CartManager();


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

//This method will return the cart with the corresponding id.
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

//This method will add a cart to the collection.
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

//This method adds a product to the cart found by its id. If it already exists it only adds 1 to its quantity, else it will create it with an intial quantity of 1 unit.
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

//This method will delete a cart.
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

//This method will delete a product within a cart.
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

//This method will updates the whole list of products in a cart.
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

//This method will update the quantity of a specific product within a specific cart.
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

//This method will delete all the products in a cart.
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

export default {
    getCarts,
    getCartsById,
    addCart,
    updateCartProducts,
    deleteCart,
    deleteCartProduct,
    updateCart,
    updateProductQuantity,
    deleteAllCartProducts
  };