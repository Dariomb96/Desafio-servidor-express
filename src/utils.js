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
