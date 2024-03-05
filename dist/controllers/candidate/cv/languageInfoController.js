"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertLanguageInfo = exports.getLanguageInfo = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const getLanguageInfo = async (req, res) => {
    const { postulanteId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
      SELECT
      pi.postulante_idioma_id,
      pi.idioma_id,
      i.idioma,
      pi.nivel
      FROM
      postulante_idiomas pi
      INNER JOIN idiomas i
        ON i.idioma_id = pi.idioma_id
      WHERE
      postulante_id = $1
    `;
        if (!postulanteId) {
            res.status(400).json({
                message: "El id del postulante es requerido",
                ok: false,
            });
            return;
        }
        const data = await (db === null || db === void 0 ? void 0 : db.query(query, [postulanteId]));
        const languages = data === null || data === void 0 ? void 0 : data.rows.map((language) => {
            return {
                id: language.postulante_idioma_id,
                idiomaId: language.idioma_id,
                idioma: language.idioma,
                nivel: language.nivel,
            };
        });
        res.status(200).json({
            data: languages,
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getLanguageInfo = getLanguageInfo;
const insertLanguageInfo = async (req, res) => {
    const { postulanteId, idiomaId, nivelIdioma } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `
        INSERT INTO postulante_idiomas (postulante_id, idioma_id, nivel)
        VALUES ($1, $2, $3)
        RETURNING idioma_id, nivel
    `;
        /*
            ON CONFLICT (postulante_id) DO UPDATE
            SET nivel = $3
            RETURNING idioma_id, nivel
        */
        if (!postulanteId || !idiomaId || !nivelIdioma) {
            res.status(400).json({
                message: "Todos los campos son requeridos",
                ok: false,
            });
            return;
        }
        const responseQuery = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            idiomaId,
            nivelIdioma,
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
exports.insertLanguageInfo = insertLanguageInfo;
const updateLanguageInfo = async (req, res) => {
    const { postulanteId, idiomaId, nivelIdioma } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `
        INSERT INTO postulante_idiomas (postulante_id, idioma_id, nivel)
        VALUES ($1, $2, $3)
        RETURNING idioma_id, nivel
    `;
        /*
            ON CONFLICT (postulante_id) DO UPDATE
            SET nivel = $3
            RETURNING idioma_id, nivel
        */
        if (!postulanteId || !idiomaId || !nivelIdioma) {
            res.status(400).json({
                message: "Todos los campos son requeridos",
                ok: false,
            });
            return;
        }
        const responseQuery = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            idiomaId,
            nivelIdioma,
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
