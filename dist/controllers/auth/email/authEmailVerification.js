"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailCodeCompany = exports.verifyEmailCode = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const verifyEmailCode = async (req, res) => {
    try {
        const client = await (0, db_1.default)();
        const { email, email_code } = req.body;
        // DEBE IR EN OTRO CONTROLLER
        const queryEmail = `SELECT email_code FROM "postulante" WHERE email = $1`;
        const rows = await (client === null || client === void 0 ? void 0 : client.query(queryEmail, [email]));
        if ((rows === null || rows === void 0 ? void 0 : rows.rows[0].email_code) !== email_code) {
            res.status(400).json({
                message: "Código incorrecto",
                status: 400,
            });
            return;
        }
        res.status(200).json({
            message: "Código correcto, siguiente paso",
            status: 200,
            ok: true,
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
exports.verifyEmailCode = verifyEmailCode;
const verifyEmailCodeCompany = async (req, res) => {
    try {
        const client = await (0, db_1.default)();
        const { email, email_code } = req.body;
        // DEBE IR EN OTRO CONTROLLER
        const queryEmail = `SELECT email_code FROM "empresa" WHERE email = $1`;
        const rows = await (client === null || client === void 0 ? void 0 : client.query(queryEmail, [email]));
        if ((rows === null || rows === void 0 ? void 0 : rows.rows[0].email_code) !== email_code) {
            res.status(400).json({
                message: "Código incorrecto",
                status: 400,
            });
            return;
        }
        res.status(200).json({
            message: "Código correcto, siguiente paso",
            status: 200,
            ok: true,
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
exports.verifyEmailCodeCompany = verifyEmailCodeCompany;
