"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertEducationInfo = exports.getEducationInfo = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const getEducationInfo = async (req, res) => {
    const { postulanteId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
        SELECT * FROM postulante_estudios
        WHERE postulante_id = $1
    `;
        const data = await (db === null || db === void 0 ? void 0 : db.query(query, [postulanteId]));
        const studies = data === null || data === void 0 ? void 0 : data.rows.map((study) => {
            return {
                id: study.postulante_estudio_id,
                descripcion: study.descripcion_estudio,
                titulo: study.titulo,
                institucion: study.institucion,
                fechaInicio: study.anio_inicio,
                fechaFin: study.anio_fin,
            };
        });
        res.status(200).json({
            studies,
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getEducationInfo = getEducationInfo;
const insertEducationInfo = async (req, res) => {
    const { postulanteId, descripcionEstudio, titulo, institucion, anio_inicio, anio_fin, } = req.body;
    try {
        const db = await (0, db_1.default)();
        //TABLA postulante_estudios
        const query = `
            INSERT INTO postulante_estudios (postulante_id, descripcion_estudio, titulo, institucion, anio_inicio, anio_fin)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `;
        /*
            ON CONFLICT (postulante_id) DO UPDATE
                SET descripcion_estudio = $2,
                titulo = $3,
                institucion = $4,
                anio_inicio = $5,
                anio_fin = $6
                RETURNING *
            */
        const responseQuery = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            descripcionEstudio,
            titulo,
            institucion,
            anio_inicio,
            anio_fin,
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
exports.insertEducationInfo = insertEducationInfo;
const updateEducationInfo = async (req, res) => {
    const { postulanteId, descripcionEstudio, titulo, institucion, anio_inicio, anio_fin, } = req.body;
    try {
        const db = await (0, db_1.default)();
        //TABLA postulante_estudios
        const query = `
            INSERT INTO postulante_estudios (postulante_id, descripcion_estudio, titulo, institucion, anio_inicio, anio_fin)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `;
        /*
            ON CONFLICT (postulante_id) DO UPDATE
                SET descripcion_estudio = $2,
                titulo = $3,
                institucion = $4,
                anio_inicio = $5,
                anio_fin = $6
                RETURNING *
            */
        const responseQuery = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            descripcionEstudio,
            titulo,
            institucion,
            anio_inicio,
            anio_fin,
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
