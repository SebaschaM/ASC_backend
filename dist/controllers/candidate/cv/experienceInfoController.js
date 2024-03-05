"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertExperienceInfo = exports.getExperienceInfo = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const getExperienceInfo = async (req, res) => {
    const { postulanteId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
      SELECT * FROM postulante_experiencia
      WHERE postulante_id = $1
    `;
        const response = await (db === null || db === void 0 ? void 0 : db.query(query, [postulanteId]));
        const experiences = response === null || response === void 0 ? void 0 : response.rows.map((experience) => {
            return {
                id: experience.postulante_experiencia_id,
                empresa: experience.empresa,
                cargo: experience.cargo,
                anio_inicio: experience.anio_inicio,
                anio_fin: experience.anio_fin,
                funciones: experience.funciones,
            };
        });
        res.status(200).json({
            data: experiences,
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getExperienceInfo = getExperienceInfo;
const insertExperienceInfo = async (req, res) => {
    const { postulanteId, cargo, funciones, empresa, anio_inicio, anio_fin } = req.body;
    try {
        const db = await (0, db_1.default)();
        //TABLA postulante_experiencia
        const query = `
        INSERT INTO postulante_experiencia (postulante_id, empresa, cargo, anio_inicio, anio_fin, funciones)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
        /*
        ON CONFLICT (postulante_id) DO UPDATE
            SET empresa = $2,
            cargo = $3,
            anio_inicio = $4,
            anio_fin = $5,
            funciones = $6
            RETURNING *
        */
        const responseQuery = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            empresa,
            cargo,
            anio_inicio,
            anio_fin,
            funciones,
        ]));
        res.status(200).json({
            data: responseQuery === null || responseQuery === void 0 ? void 0 : responseQuery.rows[0],
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.insertExperienceInfo = insertExperienceInfo;
const updateExperienceInfo = async (req, res) => {
    const { postulanteId, cargo, funciones, empresa, anio_inicio, anio_fin } = req.body;
    try {
        const db = await (0, db_1.default)();
        //TABLA postulante_experiencia
        const query = `
        INSERT INTO postulante_experiencia (postulante_id, empresa, cargo, anio_inicio, anio_fin, funciones)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
        /*
        ON CONFLICT (postulante_id) DO UPDATE
            SET empresa = $2,
            cargo = $3,
            anio_inicio = $4,
            anio_fin = $5,
            funciones = $6
            RETURNING *
        */
        const responseQuery = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            empresa,
            cargo,
            anio_inicio,
            anio_fin,
            funciones,
        ]));
        res.status(200).json({
            data: responseQuery === null || responseQuery === void 0 ? void 0 : responseQuery.rows[0],
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
