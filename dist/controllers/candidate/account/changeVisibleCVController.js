"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeVisibleCV = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const changeVisibleCV = async (req, res) => {
    const { visibleState, postulanteId } = req.body;
    let cv_visible;
    try {
        const db = await (0, db_1.default)();
        if (visibleState === 1) {
            cv_visible = true;
        }
        else if (visibleState === 0) {
            cv_visible = false;
        }
        //en caso uno sea vacio o los dos
        if (cv_visible === undefined || postulanteId === undefined) {
            return res.status(400).json({
                ok: false,
                message: "Faltan datos para actualizar la visibilidad del CV",
                status: 400,
            });
        }
        const query = `UPDATE postulante SET cv_visible = $1 WHERE postulante_id = $2`;
        await (db === null || db === void 0 ? void 0 : db.query(query, [cv_visible, postulanteId]));
        res.status(200).json({
            ok: true,
            message: "Visibilidad del CV actualizada con éxito",
            status: 200,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.changeVisibleCV = changeVisibleCV;
