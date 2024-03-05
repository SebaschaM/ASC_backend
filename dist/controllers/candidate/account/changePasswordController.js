"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePassword = async (req, res) => {
    const { postulanteId, password } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `UPDATE postulante SET password = $1 WHERE postulante_id = $2`;
        // Encriptar nueva contraseña
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        await (db === null || db === void 0 ? void 0 : db.query(query, [passwordHash, postulanteId]));
        res.status(200).json({
            ok: true,
            message: "Contraseña actualizada con éxito",
            status: 200,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.changePassword = changePassword;
