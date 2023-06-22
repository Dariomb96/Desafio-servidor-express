import bcrypt from "bcrypt";

export function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(password, user) {
    return bcrypt.compareSync(password, user);
}

export const checkUserRole = (role) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (userRole !== role) {
            return res.status(403).json({
                error: 'Unauthorized access',
            });
        }
        next();
    };
};

export function calcTotal(quantity, price) {
    return quantity * price;
}

export function calcTotalCart(cartProducts) {
    let totalPrice = 0;
    cartProducts.forEach((product) => {
        totalPrice += calcTotal(product.quantity, product.product.price);
    });
    return totalPrice;
}