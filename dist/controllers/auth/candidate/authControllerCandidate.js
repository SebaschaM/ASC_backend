"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthCandidate = exports.completeRegisterCandidate = exports.inCompleteRegisterCandidate = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailService_1 = __importDefault(require("../../../utils/emailService"));
const sesClient_1 = require("../../../utils/libs/sesClient");
const email_code = Math.floor(100000 + Math.random() * 900000);
const email_code2 = Math.floor(100000 + Math.random() * 900000);
// CANDIDATE
const inCompleteRegisterCandidate = async (req, res) => {
    try {
        const { email } = req.body;
        const client = await (0, db_1.default)();
        const queryEmailDuplicate = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'TRUE'`;
        const rowsVerification = await (client === null || client === void 0 ? void 0 : client.query(queryEmailDuplicate, [email]));
        if ((rowsVerification === null || rowsVerification === void 0 ? void 0 : rowsVerification.rows[0].count) > 0) {
            res.status(400).json({
                message: "El email ya se encuentra registrado",
                status: 400,
            });
            return;
        }
        const queryEmailDuplicateInactive = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'FALSE'`;
        const rowsInactive = await (client === null || client === void 0 ? void 0 : client.query(queryEmailDuplicateInactive, [
            email,
        ]));
        if ((rowsInactive === null || rowsInactive === void 0 ? void 0 : rowsInactive.rows[0].count) > 0) {
            res.status(200).json({
                ok: true,
                status: 200,
                message: "El email ya se encuentra registrado, pero no ha sido activado",
                data: {
                    email,
                },
            });
            const queryUpdateCodeEmail = `UPDATE "postulante" SET email_code = $1 WHERE email = $2`;
            await (client === null || client === void 0 ? void 0 : client.query(queryUpdateCodeEmail, [email_code2, email]));
            const sendEmail = (0, emailService_1.default)(email, email_code2);
            await sesClient_1.sesClient.send(sendEmail);
            return;
        }
        //EN RESUMEN, SI EL EMAIL NO ESTÁ DUPLICADO, SE INSERTA EN LA BASE DE DATOS, PERO CON EL USUARIO INACTIVO
        const queryInsert = `INSERT INTO "postulante" (email, account_confirm, email_code, active, created_at) VALUES ($1, FALSE, $2, FALSE, CURRENT_TIMESTAMP)`;
        await (client === null || client === void 0 ? void 0 : client.query(queryInsert, [email, email_code]));
        const sendEmail = (0, emailService_1.default)(email, email_code);
        await sesClient_1.sesClient.send(sendEmail);
        res.status(200).json({
            message: "Email enviado",
            status: 200,
            ok: true,
            data: {
                email,
            },
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
        return;
    }
};
exports.inCompleteRegisterCandidate = inCompleteRegisterCandidate;
const completeRegisterCandidate = async (req, res) => {
    //PUT
    try {
        const { email, nombres, apellidos, password } = req.body;
        const client = await (0, db_1.default)();
        const queryEmailDuplicateActivate = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'TRUE'`;
        const rowsVerification = await (client === null || client === void 0 ? void 0 : client.query(queryEmailDuplicateActivate, [
            email,
        ]));
        if ((rowsVerification === null || rowsVerification === void 0 ? void 0 : rowsVerification.rows[0].count) > 0) {
            res.status(400).json({
                message: "El email ya se encuentra registrado",
                status: 400,
            });
            return;
        }
        const passwordEncrypt = await bcrypt_1.default.hash(password, 10);
        const queryUpdate = `UPDATE "postulante" SET nombre = $1, cv_visible = false, apellidos = $2, password = $3, account_confirm = TRUE, active = TRUE WHERE email = $4 RETURNING *`;
        const rows = await (client === null || client === void 0 ? void 0 : client.query(queryUpdate, [
            nombres,
            apellidos,
            passwordEncrypt,
            email,
        ]));
        const user = rows === null || rows === void 0 ? void 0 : rows.rows[0];
        const id_user = user.postulante_id;
        const emailCandidate = user.email;
        const nombresC = user.nombre;
        const apellidosC = user.apellidos;
        const avatar = user.avatar;
        const cv = user.cv;
        const cv_visible = user.cv_visible;
        const created_at = user.created_at;
        res.status(200).json({
            message: "Usuario activado",
            status: 200,
            ok: true,
            data: {
                id_user,
                emailCandidate,
                nombresC,
                apellidosC,
                avatar,
                cv,
                cv_visible,
                created_at,
            },
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.completeRegisterCandidate = completeRegisterCandidate;
const loginAuthCandidate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await (0, db_1.default)();
        // Obtener el hash de la contraseña almacenada en la base de datos
        const query = `SELECT * FROM "postulante" WHERE email = $1`;
        const rows = await (client === null || client === void 0 ? void 0 : client.query(query, [email]));
        if ((rows === null || rows === void 0 ? void 0 : rows.rows.length) === 0) {
            res.status(400).json({
                message: "El email no se encuentra registrado",
                status: 400,
            });
            return;
        }
        //EXTRAER TODA LA INFO DE LA QUERY
        const user = rows === null || rows === void 0 ? void 0 : rows.rows[0];
        const id_user = user.postulante_id;
        const emailCandidate = user.email;
        const nombresC = user.nombre;
        const apellidosC = user.apellidos;
        const passwordHash = user.password;
        const avatar = user.avatar;
        const cv = user.cv;
        const cv_visible = user.cv_visible;
        const created_at = user.created_at;
        //COMPARAR LA CONTRASEÑA
        const passwordMatch = await bcrypt_1.default.compare(password, passwordHash);
        if (!passwordMatch) {
            res.status(400).json({
                message: "La contraseña es incorrecta",
            });
            return;
        }
        res.status(200).json({
            message: "Login correcto",
            status: 200,
            ok: true,
            data: {
                id_user,
                emailCandidate,
                nombresC,
                apellidosC,
                avatar,
                cv,
                cv_visible,
                created_at,
            },
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.loginAuthCandidate = loginAuthCandidate;
