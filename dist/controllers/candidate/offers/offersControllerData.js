"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfferAreasTop = exports.getOffersDataByJobAndLocation = exports.getOffersDataByOfferArea = exports.getOffersDataByJob = exports.getOffersDataByLocation = void 0;
const db_1 = __importDefault(require("../../../database/db"));
//FILTERS
const getOffersDataByLocation = async (req, res) => {
    const { location } = req.params;
    try {
        const db = await (0, db_1.default)(); // Invoke the dbConnect function to get the Client object
        const query = `
      SELECT 
      * 
      FROM 
      oferta o
      LEFT JOIN provincia p
        ON o.provincia_id = p.provincia_id
      LEFT JOIN departamento d
        ON d.departamento_id = p.departamento_id
      LEFT JOIN empresa e
        ON o.empresa_id = e.empresa_id
      LEFT JOIN empresa_informacion ei
        ON ei.empresa_informacion_id = e.empresa_informacion_id
      LEFT JOIN oferta_jornada oj
        ON oj.oferta_jornada_id = o.jornada_id
      LEFT JOIN oferta_modalidad om
        ON om.oferta_modalidad_id = o.modalidad_trabajo_id
      LEFT JOIN oferta_area oa
        ON oa.oferta_area_id = o.area_id
      LEFT JOIN tipo_moneda tm
        ON tm.tipo_moneda_id = o.tipo_moneda_id
      LEFT JOIN contrato c
        ON c.contrato_id = o.tipo_contrato_id
      WHERE 
        o.provincia_id = $1 AND o.estado_oferta_id = 1
    `;
        const result = await db.query(query, [location]);
        const offers = result === null || result === void 0 ? void 0 : result.rows.map((offer) => {
            return {
                oferta_id: offer.oferta_id,
                empresa: {
                    empresa_id: offer.empresa_id,
                    empresa_informacion_id: offer.empresa_informacion_id,
                    nombre_completo: offer.nombre_comercial,
                    departamento: offer.nombre_departamento,
                    provincia: offer.nombre_provincia,
                    direccion: offer.direccion,
                    email: offer.email,
                    sitio_web: offer.sitio_web,
                    avatar: offer.avatar,
                },
                jornada: {
                    jornada_id: offer.jornada_id,
                    nombre: offer.jornada,
                },
                modalidad_trabajo: {
                    modalidad_trabajo_id: offer.oferta_modalidad_id,
                    nombre: offer.modalidad,
                },
                area: {
                    area_id: offer.area_id,
                    nombre: offer.nombre,
                },
                nombre_puesto: offer.nombre_puesto,
                vacantes: offer.vacantes,
                tipo_moneda: {
                    tipo_moneda_id: offer.tipo_moneda_id,
                    nombre: offer.nombre_moneda,
                },
                descripcion: offer.descripcion,
                tipo_contrato: {
                    tipo_contrato_id: offer.contrato_id,
                    nombre: offer.tipo_contrato,
                },
                fecha_creacion: offer.fecha_creacion,
            };
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: offers,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOffersDataByLocation = getOffersDataByLocation;
const getOffersDataByJob = async (req, res) => {
    const { job } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
    SELECT 
      * 
      FROM 
      oferta o
      LEFT JOIN provincia p
        ON o.provincia_id = p.provincia_id
      LEFT JOIN departamento d
        ON d.departamento_id = p.departamento_id
      LEFT JOIN empresa e
        ON o.empresa_id = e.empresa_id
      LEFT JOIN empresa_informacion ei
        ON ei.empresa_informacion_id = e.empresa_informacion_id
      LEFT JOIN oferta_jornada oj
        ON oj.oferta_jornada_id = o.jornada_id
      LEFT JOIN oferta_modalidad om
        ON om.oferta_modalidad_id = o.modalidad_trabajo_id
      LEFT JOIN oferta_area oa
        ON oa.oferta_area_id = o.area_id
      LEFT JOIN tipo_moneda tm
        ON tm.tipo_moneda_id = o.tipo_moneda_id
      LEFT JOIN contrato c
        ON c.contrato_id = o.tipo_contrato_id
      WHERE o.nombre_puesto ILIKE $1 AND o.estado_oferta_id = 1`;
        const result = await (db === null || db === void 0 ? void 0 : db.query(query, [`%${job}%`]));
        const offers = result === null || result === void 0 ? void 0 : result.rows.map((offer) => {
            return {
                oferta_id: offer.oferta_id,
                empresa: {
                    empresa_id: offer.empresa_id,
                    empresa_informacion_id: offer.empresa_informacion_id,
                    nombre_completo: offer.nombre_comercial,
                    departamento: offer.nombre_departamento,
                    provincia: offer.nombre_provincia,
                    direccion: offer.direccion,
                    email: offer.email,
                    sitio_web: offer.sitio_web,
                    avatar: offer.avatar,
                },
                jornada: {
                    jornada_id: offer.jornada_id,
                    nombre: offer.jornada,
                },
                modalidad_trabajo: {
                    modalidad_trabajo_id: offer.oferta_modalidad_id,
                    nombre: offer.modalidad,
                },
                area: {
                    area_id: offer.area_id,
                    nombre: offer.nombre,
                },
                nombre_puesto: offer.nombre_puesto,
                vacantes: offer.vacantes,
                tipo_moneda: {
                    tipo_moneda_id: offer.tipo_moneda_id,
                    nombre: offer.nombre_moneda,
                },
                descripcion: offer.descripcion,
                tipo_contrato: {
                    tipo_contrato_id: offer.contrato_id,
                    nombre: offer.tipo_contrato,
                },
                fecha_creacion: offer.fecha_creacion,
            };
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: offers,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOffersDataByJob = getOffersDataByJob;
const getOffersDataByOfferArea = async (req, res) => {
    const { areaId } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
      SELECT 
      * 
      FROM 
      oferta o
      LEFT JOIN provincia p
        ON o.provincia_id = p.provincia_id
      LEFT JOIN departamento d
        ON d.departamento_id = p.departamento_id
      LEFT JOIN empresa e
        ON o.empresa_id = e.empresa_id
      LEFT JOIN empresa_informacion ei
        ON ei.empresa_informacion_id = e.empresa_informacion_id
      LEFT JOIN oferta_jornada oj
        ON oj.oferta_jornada_id = o.jornada_id
      LEFT JOIN oferta_modalidad om
        ON om.oferta_modalidad_id = o.modalidad_trabajo_id
      LEFT JOIN oferta_area oa
        ON oa.oferta_area_id = o.area_id
      LEFT JOIN tipo_moneda tm
        ON tm.tipo_moneda_id = o.tipo_moneda_id
      LEFT JOIN contrato c
        ON c.contrato_id = o.tipo_contrato_id
      WHERE o.area_id = $1 AND o.estado_oferta_id = 1`;
        const result = await (db === null || db === void 0 ? void 0 : db.query(query, [areaId]));
        const offers = result === null || result === void 0 ? void 0 : result.rows.map((offer) => {
            return {
                oferta_id: offer.oferta_id,
                empresa: {
                    empresa_id: offer.empresa_id,
                    empresa_informacion_id: offer.empresa_informacion_id,
                    nombre_completo: offer.nombre_comercial,
                    departamento: offer.nombre_departamento,
                    provincia: offer.nombre_provincia,
                    direccion: offer.direccion,
                    email: offer.email,
                    sitio_web: offer.sitio_web,
                    avatar: offer.avatar,
                },
                jornada: {
                    jornada_id: offer.jornada_id,
                    nombre: offer.jornada,
                },
                modalidad_trabajo: {
                    modalidad_trabajo_id: offer.oferta_modalidad_id,
                    nombre: offer.modalidad,
                },
                area: {
                    area_id: offer.area_id,
                    nombre: offer.nombre,
                },
                nombre_puesto: offer.nombre_puesto,
                vacantes: offer.vacantes,
                tipo_moneda: {
                    tipo_moneda_id: offer.tipo_moneda_id,
                    nombre: offer.nombre_moneda,
                },
                descripcion: offer.descripcion,
                tipo_contrato: {
                    tipo_contrato_id: offer.contrato_id,
                    nombre: offer.tipo_contrato,
                },
                fecha_creacion: offer.fecha_creacion,
            };
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: offers,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOffersDataByOfferArea = getOffersDataByOfferArea;
const getOffersDataByJobAndLocation = async (req, res) => {
    const { job, location } = req.params;
    try {
        const db = await (0, db_1.default)();
        const query = `
    SELECT 
    * 
    FROM 
    oferta o
    LEFT JOIN provincia p
      ON o.provincia_id = p.provincia_id
    LEFT JOIN departamento d
      ON d.departamento_id = p.departamento_id
    LEFT JOIN empresa e
      ON o.empresa_id = e.empresa_id
    LEFT JOIN empresa_informacion ei
      ON ei.empresa_informacion_id = e.empresa_informacion_id
    LEFT JOIN oferta_jornada oj
      ON oj.oferta_jornada_id = o.jornada_id
    LEFT JOIN oferta_modalidad om
      ON om.oferta_modalidad_id = o.modalidad_trabajo_id
    LEFT JOIN oferta_area oa
      ON oa.oferta_area_id = o.area_id
    LEFT JOIN tipo_moneda tm
      ON tm.tipo_moneda_id = o.tipo_moneda_id
    LEFT JOIN contrato c
      ON c.contrato_id = o.tipo_contrato_id
    WHERE nombre_puesto ILIKE $1 AND o.provincia_id = $2 AND o.estado_oferta_id = 1`;
        const result = await (db === null || db === void 0 ? void 0 : db.query(query, [`%${job}%`, location]));
        const offers = result === null || result === void 0 ? void 0 : result.rows.map((offer) => {
            return {
                oferta_id: offer.oferta_id,
                empresa: {
                    empresa_id: offer.empresa_id,
                    empresa_informacion_id: offer.empresa_informacion_id,
                    nombre_completo: offer.nombre_comercial,
                    departamento: offer.nombre_departamento,
                    provincia: offer.nombre_provincia,
                    direccion: offer.direccion,
                    email: offer.email,
                    sitio_web: offer.sitio_web,
                    avatar: offer.avatar,
                },
                jornada: {
                    jornada_id: offer.jornada_id,
                    nombre: offer.jornada,
                },
                modalidad_trabajo: {
                    modalidad_trabajo_id: offer.oferta_modalidad_id,
                    nombre: offer.modalidad,
                },
                area: {
                    area_id: offer.area_id,
                    nombre: offer.nombre,
                },
                nombre_puesto: offer.nombre_puesto,
                vacantes: offer.vacantes,
                tipo_moneda: {
                    tipo_moneda_id: offer.tipo_moneda_id,
                    nombre: offer.nombre_moneda,
                },
                descripcion: offer.descripcion,
                tipo_contrato: {
                    tipo_contrato_id: offer.contrato_id,
                    nombre: offer.tipo_contrato,
                },
                fecha_creacion: offer.fecha_creacion,
            };
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: offers,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOffersDataByJobAndLocation = getOffersDataByJobAndLocation;
//COMPONENT HOME.TSX
const getOfferAreasTop = async (req, res) => {
    try {
        const db = await (0, db_1.default)();
        const query = `SELECT * FROM oferta_area ORDER BY nombre LIMIT 5`;
        const result = await (db === null || db === void 0 ? void 0 : db.query(query));
        const areas = result === null || result === void 0 ? void 0 : result.rows.map((area) => {
            return {
                area_id: area.oferta_area_id,
                nombre: area.nombre,
            };
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: areas,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOfferAreasTop = getOfferAreasTop;
