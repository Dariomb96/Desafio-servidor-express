import bcrypt from "bcrypt";

export function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(password, user) {
    return bcrypt.compareSync(password, user);
}
