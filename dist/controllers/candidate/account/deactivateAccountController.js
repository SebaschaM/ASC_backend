"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateAccount = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const deactivateAccount = async (req, res) => {
    const { postulanteId, reasonDelete } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `UPDATE postulante SET active = false, reason_delete = $1 WHERE postulante_id = $2`;
        //EN CASO SEAN VACIOS LOS CAMPOS
        if (postulanteId === undefined || reasonDelete === undefined) {
            return res.status(400).json({
                message: "Faltan datos para desactivar la cuenta",
            });
        }
        await (db === null || db === void 0 ? void 0 : db.query(query, [reasonDelete, postulanteId]));
        res.status(200).json({ message: "Cuenta desactivada" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deactivateAccount = deactivateAccount;
