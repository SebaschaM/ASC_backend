"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePostulationStateCandidate = exports.getPostulationsApply = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const getPostulationsApply = async (req, res) => {
    const { postulanteId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
        SELECT
        of.nombre_puesto,
        of.empresa_id,
        of.departamento_id,
        of.provincia_id,
        einf.nombre_comercial,
        em.avatar,
        dep.nombre_departamento, 
        pr.nombre_provincia,
        postes.estado,
        postes.postulacion_estado_id,
        post.actualizacion_descripcion,
        post.postulante_id,
        post.postulacion_id,
        post.fecha_postulacion,
        post.postulacion_id

        FROM
        oferta of
        INNER JOIN postulacion post
            ON of.oferta_id = post.oferta_id
        INNER JOIN postulacion_estado postes
            ON post.postulacion_estado_id = postes.postulacion_estado_id
        INNER JOIN empresa em
            ON of.empresa_id = em.empresa_id
        INNER JOIN empresa_informacion einf
            ON einf.empresa_informacion_id = em.empresa_informacion_id
        INNER JOIN departamento dep
            ON of.departamento_id = dep.departamento_id
        INNER JOIN provincia pr
            ON of.provincia_id = pr.provincia_id
        WHERE postulante_id = $1
    `;
        const response = await (db === null || db === void 0 ? void 0 : db.query(query, [postulanteId]));
        const offersApply = response === null || response === void 0 ? void 0 : response.rows.map((offer) => {
            return {
                puesto: offer.nombre_puesto,
                empresa: offer.nombre_comercial,
                avatar: offer.avatar,
                departamento: offer.nombre_departamento,
                provincia: offer.nombre_provincia,
                estado: offer.estado,
                descripcion_estado: offer.actualizacion_descripcion,
                postulante_id: offer.postulante_id,
                fecha_postulacion: offer.fecha_postulacion,
                id_estado_postulacion: offer.postulacion_estado_id,
                id: offer.postulacion_id,
            };
        });
        res.status(200).json({
            ok: true,
            data: offersApply,
            status: 200,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPostulationsApply = getPostulationsApply;
const savePostulationStateCandidate = async (req, res) => {
    const { descripcionEstado, postulacionId } = req.body;
    try {
        const db = await (0, db_1.default)();
        const query = `UPDATE postulacion SET actualizacion_descripcion = $1 WHERE postulacion_id = $2`;
        await (db === null || db === void 0 ? void 0 : db.query(query, [descripcionEstado, postulacionId]));
        res.status(200).json({
            ok: true,
            message: "Estado de postulación actualizado",
            status: 200,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.savePostulationStateCandidate = savePostulationStateCandidate;
