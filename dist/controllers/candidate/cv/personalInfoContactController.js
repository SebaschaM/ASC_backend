"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPersonalInfo = exports.getPersonalInfo = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const getPersonalInfo = async (req, res) => {
    const { postulanteId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
        SELECT 
        nombre,
        apellidos,
        pais_id,
        fecha_nacimiento,
        estado_civil, 
        tipo_documento_id,
        documento
        FROM 
        postulante_contacto pc
        INNER JOIN postulante p
            ON pc.postulante_id = p.postulante_id
        WHERE pc.postulante_id = $1
    `;
        if (!postulanteId) {
            res.status(400).json({
                message: "El id del postulante es requerido",
                ok: false,
            });
            return;
        }
        const data = await (db === null || db === void 0 ? void 0 : db.query(query, [postulanteId]));
        res.status(200).json({
            data: data === null || data === void 0 ? void 0 : data.rows[0],
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPersonalInfo = getPersonalInfo;
const insertPersonalInfo = async (req, res) => {
    const { postulanteId, nombre, apellidos, 
    //paisId,
    fechaNacimiento, estadoCivil, tipoDocumentoId, documento, } = req.body;
    try {
        const db = await (0, db_1.default)();
        //TABLA POSTULANTE
        const queryPostulante = `
        UPDATE postulante
        SET nombre = $1,
        apellidos = $2
        WHERE postulante_id = $3
        RETURNING *
    `;
        const responseQueryPostulante = await (db === null || db === void 0 ? void 0 : db.query(queryPostulante, [
            nombre,
            apellidos,
            postulanteId,
        ]));
        //TABLA POSTULANTE_CONTACTO
        const query = `
      INSERT INTO postulante_contacto(
          postulante_id, 
          pais_id, 
          fecha_nacimiento, 
          estado_civil, 
          tipo_documento_id, 
          documento)
      VALUES ($1, 1, $2, $3, $4, $5)
      ON CONFLICT (postulante_id)
      DO UPDATE
      SET fecha_nacimiento = $2,
      estado_civil = $3,
      tipo_documento_id = $4,
      documento = $5
      RETURNING *
    `;
        const responseQueryPostulanteContacto = await (db === null || db === void 0 ? void 0 : db.query(query, [
            postulanteId,
            fechaNacimiento,
            estadoCivil,
            tipoDocumentoId,
            documento,
        ]));
        const dataPersonalInfo = Object.assign(Object.assign({}, responseQueryPostulante === null || responseQueryPostulante === void 0 ? void 0 : responseQueryPostulante.rows[0]), responseQueryPostulanteContacto === null || responseQueryPostulanteContacto === void 0 ? void 0 : responseQueryPostulanteContacto.rows[0]);
        res.status(200).json({
            message: "Información guardada",
            data: dataPersonalInfo,
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.insertPersonalInfo = insertPersonalInfo;
