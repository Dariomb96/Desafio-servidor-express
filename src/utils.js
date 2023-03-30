import bcrypt from "bcrypt";

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(password, user) {
    return bcrypt.compareSync(password, user);
}

export default {
    createHash,
    isValidPassword,
};