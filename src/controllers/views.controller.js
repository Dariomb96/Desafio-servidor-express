import { productsModel } from '../dao/models/products.js';
import { cartsModel } from '../dao/models/cart.js';



export const getProducts = async (req, res) => {
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
        result.title = 'Productos';
        result.styles = 'css/products.css';
        res.render('products', result);
    } catch (err) {
        console.log(err);
        res.render('error');
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const parsedQuantity = parseInt(quantity);
        // Verificar si el producto existe
        const product = await productsModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: `Producto no encontrado para el ID ${productId}` });
        }
        const userId = req.user._id; // Obtener el ID del usuario actual desde la solicitud
        let cart = await cartsModel.findOne({ userId: userId });
        // Si no hay carrito existente, crear uno nuevo
        if (!cart) {
            cart = await cartsModel.create({ userId: userId, products: [] });
        }
        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(item => item.product.equals(productId));
        if (existingProduct) {
            // Si el producto ya está en el carrito, verificar la cantidad total
            const newQuantity = existingProduct.quantity + parsedQuantity;
            if (newQuantity > product.stock) {
                req.session.message = `No hay suficiente stock disponible para el producto ${product.title}`;
                return res.redirect('/products/purchase');
                //return res.status(400).json({ message: `No hay suficiente stock disponible para el producto ${product.title}` });
            }
            existingProduct.quantity = newQuantity;
        } else {
            // Si el producto no está en el carrito, verificar la cantidad a agregar
            if (parsedQuantity > product.stock) { 
                req.session.message = `No hay suficiente stock disponible para el producto ${product.title}`;
                return res.redirect('/products/purchase');
                //return res.status(400).json({ message: `No hay suficiente stock disponible para el producto ${product.title}` });
            }
            // Crear un nuevo objeto de producto
            const newProduct = {
                product: productId,
                quantity: parsedQuantity,
            };
            // Agregar el nuevo producto al carrito
            cart.products.push(newProduct);
        }
        await cart.save();
    req.session.message = `El producto ${product.title} - ${product.artist} ha sido agregado al carrito.`;
    res.redirect('/products/purchase');
    //res.status(200).json({ message: "Producto agregado al carrito exitosamente", cart });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el producto al carrito' });
}
};
export async function renderChoice(req, res) {
    const message = req.session.message; 
    res.render('purchase', { title: "purchase", styles: "css/profile.css", message: message });
};

export async function renderCheckout(req, res) {
    try {
        const userId = req.user._id;
        const cart = await cartsModel.findOne({ userId: userId }); // Obtener el ID del carrito desde los parámetros de la solicitud
        if (!cart) {
            return res.render('checkout', { title: "Checkout", styles: "css/checkout.css", });
        }
        const cartJSON = cart.toJSON(); // Convertir el objeto cart a JSON
        const cartProducts = cartJSON.products;
        res.render('checkout', { 
            title: "Checkout", 
            styles: "css/checkout.css", 
            cartProducts, 
        });
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message; 
        console.log(error);
    }
}  

export async function renderTicket(req, res) {
    try {
        const userId = req.user._id;
        const cart = await cartsModel.findOne({ userId: userId });
        const cartJSON = cart.toJSON(); // Convertir el objeto cart a JSON
        const cartProducts = cartJSON.products;
        res.render('ticket', {
            title: "Ticket",
            styles: "css/ticket.css",
            cartProducts,
        });
    } catch (err) {
        res.status(500).send(err.message);
        const error = err.message;
        console.log(error);
    }
}