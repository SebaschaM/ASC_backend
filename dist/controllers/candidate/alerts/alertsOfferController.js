"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlertOfferDataById = exports.insertAlertOffer = exports.updateAlertOffer = exports.getAlertsOffer = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const getAlertsOffer = async (req, res) => {
    const { postulanteId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `SELECT * FROM postulante_alertas WHERE postulante_id = $1`;
        const response = await (db === null || db === void 0 ? void 0 : db.query(query, [postulanteId]));
        const alerts = response === null || response === void 0 ? void 0 : response.rows.map((alert) => {
            return {
                id: alert.alerta_id,
                postulante_id: alert.postulante_id,
                puesto_interes: alert.puesto_interes,
                ubicacion: alert.ubicacion,
                frecuencia: alert.frecuencia,
            };
        });
        res.status(200).json({
            data: alerts,
            ok: true,
            status: 200,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAlertsOffer = getAlertsOffer;
const updateAlertOffer = async (req, res) => {
    const { alertId, puesto_interes, ubicacion, frecuencia, postulante_id } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `UPDATE postulante_alertas SET puesto_interes = $1, ubicacion = $2, frecuencia = $3 WHERE alerta_id = $4 AND postulante_id = $5`;
        await (db === null || db === void 0 ? void 0 : db.query(query, [
            puesto_interes,
            ubicacion,
            frecuencia,
            alertId,
            postulante_id,
        ]));
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Alerta actualizada correctamente",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateAlertOffer = updateAlertOffer;
const insertAlertOffer = async (req, res) => {
    const { puesto_interes, ubicacion, frecuencia, postulante_id } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `INSERT INTO postulante_alertas (puesto_interes, ubicacion, frecuencia, postulante_id) VALUES ($1, $2, $3, $4)`;
        await (db === null || db === void 0 ? void 0 : db.query(query, [
            puesto_interes,
            ubicacion,
            frecuencia,
            postulante_id,
        ]));
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Alerta creada correctamente",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.insertAlertOffer = insertAlertOffer;
const getAlertOfferDataById = async (req, res) => {
    const { alertId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `SELECT * FROM postulante_alertas WHERE alerta_id = $1`;
        const response = await (db === null || db === void 0 ? void 0 : db.query(query, [alertId]));
        res.status(200).json({
            data: response === null || response === void 0 ? void 0 : response.rows[0],
            ok: true,
            status: 200,
        });
    }
    catch (error) {
        return error.message;
    }
};
exports.getAlertOfferDataById = getAlertOfferDataById;
