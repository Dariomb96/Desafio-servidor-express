import { userModel } from "../dao/models/users.js";
import { isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const response = await userModel.findOne({
            $or: [{ email: username }, { first_name: username }],
        });
        if (response) {
            if (isValidPassword(password, response.password)) {
                // Genera el token JWT
                const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET)
                ;
                response.lastLogin = new Date();
                await response.save();
                // Crea la cookie y establece el token JWT
                res.cookie(process.env.JWT_COOKIE_NAME, token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24, // 1 dia
                });
                // Respuesta exitosa
                res.status(200).json({ message: "success", data: response });
            } else {
                res.status(401).json({
                    message: "error",
                    data: "Error, por favor revisa tus credenciales.",
                });
            }
        } else {
            res.status(404).json({
                message: "error",
                data: "Algo ha pasado, consulta al administrador",
            });
        }
    } catch (error) {
        console.error('Error en el controlador de inicio de sesión:', error);
        res.status(500).json({ error: error.message });
    }
}
