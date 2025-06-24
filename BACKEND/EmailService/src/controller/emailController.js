import transporter from "../config/emailConfig.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.resolve(__dirname, '../views/photos/LOGOIICwhite.png');

export const sendEmail = async (req, res) => {
    const { to, subject, nombre } = req.body; // Asegúrate de recibir 'nombre' en el body

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: 'email', // Nombre de la plantilla sin extensión (views/emails/email.hbs)
            context: { to, subject, nombre } // Pasar variables a la plantilla
        });

        return res.json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export async function sendEmailWelcome(to, password){
    let subject = "Welcome";
    let username = to;
    let pass =  password;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: 'welcome', // Nombre de la plantilla sin extensión (views/emails/Welcome.hbs)
            context: { username, pass }, // Pasar variables a la plantilla
            attachments: [
                {
                    filename: 'LOGOIICwhite.png',
                    path: path.resolve(__dirname, '../views/photos/LOGOIICwhite.png'), // Ruta real a la imagen en tu proyecto
                    cid: 'logoHeader' // Este "cid" se usará en el src del img
                },
                {
                    filename: 'LOGOUJED.png',
                    path: path.resolve(__dirname, '../views/photos/LOGOUJED.png'),
                    cid: 'logoFooter'
                }
            ]
        });

    } catch (error) {
        console.log(error);
    }
};

export async function sendEmailForgetPassword(to, newPass){
    let subject = "Forget password";
    let username = to;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: 'recover', // Nombre de la plantilla sin extensión (views/emails/Welcome.hbs)
            context: { username, newPass }, // Pasar variables a la plantilla
            attachments: [
                {
                    filename: 'LOGOIICwhite.png',
                    path: path.resolve(__dirname, '../views/photos/LOGOIICwhite.png'), // Ruta real a la imagen en tu proyecto
                    cid: 'logoHeader' // Este "cid" se usará en el src del img
                },
                {
                    filename: 'LOGOUJED.png',
                    path: path.resolve(__dirname, '../views/photos/LOGOUJED.png'),
                    cid: 'logoFooter'
                }
            ]
        });

    } catch (error) {
        console.log(error);
    }
};
