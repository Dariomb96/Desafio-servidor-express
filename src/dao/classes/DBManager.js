import { cartsModel } from "../models/cart.js";

class CartsManager {
    // This function returns all the carts present in the collection. In case there is a limit set with a query param it limits the data being sent.
    getCarts(a) {
        if (a === undefined) {
            return cartsModel.find();
        }
        return cartsModel.find().limit(a);
    }

    //This function brings the carts present in the collection by id.
    getCartById(id) {
        return cartsModel.find({ _id: id });
    }

    //This function will add a cart to the collection.
    addCart(arr) {
        return cartsModel.create(arr);
    }

    //This functions updates the products present in a cart (found by id).
    // In case the product already exists it only adds 1 unit, if not it adds it with a quantity of 1.
    async updateCartProducts(cid, pid) {
        let ind;
        const cart = await cartsModel.find({ _id: cid });
        const newProd = { product: pid, quantity: 1 };
        const Nproducts = cart[0].products;

        Nproducts.forEach((element, index) => {
            if (pid === element.product._id.toJSON()) {
                ind = index;
            }
        });

        if (!isNaN(ind)) {
            Nproducts[ind].quantity++;
        } else {
            Nproducts.push(newProd);
        }

        const result = cartsModel
            .find({ _id: cid })
            .updateMany({ products: Nproducts });
        return result;
    }

    //This function delete a cart from the collection.
    deleteCart(id) {
        return cartsModel.deleteOne({ _id: id });
    }

    //This function deletes a given product in a already existing cart.
    async deleteCartProduct(cid, pid) {
        let ind;
        const cart = await cartsModel.find({ _id: cid });
        const Nproducts = cart[0].products;
        Nproducts.forEach((element, index) => {
            if (pid === element.product._id.toJSON()) {
                ind = index;
            }
        });

        if (!isNaN(ind)) {
            Nproducts.splice(ind, 1);
            const result = cartsModel
                .find({ _id: cid })
                .updateMany({ products: Nproducts });
            return result;
        }
    }

    //This function allows you to update the whole cart.
    updateCart(cid, products) {
        const result = cartsModel
            .find({ _id: cid })
            .updateMany({ products: products });
        return result;
    }

    //This function updates the quantity of an already existing product.
    async updateProductQuantity(cid, pid, qty) {
        let ind;
        const cart = await cartsModel.find({ _id: cid });
        const Nproducts = cart[0].products;
        Nproducts.forEach((element, index) => {
            if (pid === element.product._id.toJSON()) {
                ind = index;
            }
        });

        if (!isNaN(ind)) {
            Nproducts[ind].quantity = qty.quantity;
            const result = cartsModel
                .find({ _id: cid })
                .updateMany({ products: Nproducts });
            return result;
        }
    }

    //This function deletes the products from a cart.
    deleteCartProducts(cid) {
        const result = cartsModel.find({ _id: cid }).updateMany({ products: [] });
        return result;
    }
}
export default CartsManager;