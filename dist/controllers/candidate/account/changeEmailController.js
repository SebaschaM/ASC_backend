"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEmail = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const changeEmail = async (req, res) => {
    const { postulanteId, email } = req.body;
    try {
        const db = await (0, db_1.default)();
        //VERIFICAR SI EMAIL YA EXISTE
        const queryCountCandidateEmail = `SELECT COUNT(email) FROM postulante WHERE email =$1`;
        const queryCountCompanyEmail = `SELECT COUNT(email) FROM empresa WHERE email = $1`;
        const rowsCandidate = await (db === null || db === void 0 ? void 0 : db.query(queryCountCandidateEmail, [email]));
        const rowsCompany = await (db === null || db === void 0 ? void 0 : db.query(queryCountCompanyEmail, [email]));
        if ((rowsCandidate === null || rowsCandidate === void 0 ? void 0 : rowsCandidate.rows[0].count) > 0 || (rowsCompany === null || rowsCompany === void 0 ? void 0 : rowsCompany.rows[0].count) > 0) {
            res.status(400).json({
                message: "El email ya se encuentra registrado",
                status: 400,
            });
            return;
        }
        const query = `UPDATE postulante SET email = $1 WHERE postulante_id = $2`;
        await (db === null || db === void 0 ? void 0 : db.query(query, [email, postulanteId]));
        res.status(200).json({
            ok: true,
            message: "Correo actualizado con éxito",
            status: 200,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.changeEmail = changeEmail;
