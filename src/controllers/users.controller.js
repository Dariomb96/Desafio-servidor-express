import { userModel } from "../dao/models/users.js";
import transport from "../config/mail.config.js";

export const getUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}, 'first_name email role');
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios: ' + error.message);
    }
};

export const deleteInactiveController = async (req, res) => {
    // Ajusta este valor a 172800 si quieres usar 2 días
    const inactiveThreshold = 172800; // 1800 = 30 minutos en segundos
    const inactiveDate = new Date(Date.now() - inactiveThreshold * 1000);

    try {
        const inactiveUsers = await userModel.find({ lastLogin: { $lt: inactiveDate } });
        const deletedUsers = [];

        for (const user of inactiveUsers) {
            const mailOptions = {
                from: 'betancourtdariom@gmail.com',
                to: 'betancourtdariom@gmail.com', //user.email
                subject: 'Su cuenta ha sido eliminada por inactividad',
                text: 'Su cuenta ha sido eliminada debido a la falta de actividad.',
            };

            await transport.sendMail(mailOptions);
            await user.deleteOne({ _id: user._id });
            deletedUsers.push(user);
        }

        res.json({ message: 'Usuarios eliminados exitosamente', data: deletedUsers });
    } catch (error) {
        res.status(500).send('Error al eliminar usuarios inactivos: ' + error.message);
    }
};

export const viewUsersController = async (req, res) => {
    try {
        // Obtener todos los usuarios desde la base de datos
        const users = await userModel.find();
        // Devolver los usuarios en la respuesta
        res.render('users', {users: users.map(user => user.toJSON())}); 
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios: ' + error.message);
    }
}; 

export const updateRoleController = async (req, res) => {
    try {
        const { userId, newRole } = req.body;
        // Actualizar el rol del usuario en la base de datos
        await userModel.findByIdAndUpdate(userId, { role: newRole });
        res.json({ message: 'Rol de usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).send('Error al actualizar el rol del usuario: ' + error.message);
    }
};

export const deleteUserController = async (req, res) => {
    try {
        console.log(req.body);
        const { userId } = req.body;
        console.log(userId)
        // Eliminar el usuario de la base de datos
        await userModel.findByIdAndRemove(userId);
        res.json({ message: 'Usuario eliminado exitosamente '});
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario: ' + error.message);
    }
};