"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffersByUser = exports.applyOffer = void 0;
const db_1 = __importDefault(require("../../../database/db"));
const applyOffer = async (req, res) => {
    try {
        const { ofertaId, postulanteId } = req.body;
        // Validación de datos de entrada
        if (!ofertaId || !postulanteId) {
            return res.status(400).json({
                message: "Faltan datos para aplicar a la oferta",
                status: 400,
                ok: false,
            });
        }
        const client = await (0, db_1.default)();
        const query = `INSERT INTO public.postulacion(postulante_id, oferta_id, postulacion_estado_id, fecha_postulacion) VALUES ($1, $2, 1, CURRENT_TIMESTAMP)`;
        await (client === null || client === void 0 ? void 0 : client.query(query, [postulanteId, ofertaId]));
        res.status(200).json({
            message: "Oferta aplicada",
            status: 200,
            ok: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.applyOffer = applyOffer;
const getOffersByUser = async (req, res) => {
    try {
        const { postulanteId } = req.params;
        //console.log(postulanteId)
        if (!postulanteId) {
            return res.status(400).json({
                message: "Faltan datos para obtener las ofertas",
                status: 400,
                ok: false,
            });
        }
        const client = await (0, db_1.default)();
        const query = `
        SELECT
        *
        FROM
            postulante u_post
        LEFT JOIN postulacion post
            ON post.postulante_id = u_post.postulante_id
        WHERE post.postulante_id = $1`;
        const rows = await (client === null || client === void 0 ? void 0 : client.query(query, [postulanteId]));
        res.status(200).json({
            message: "Ofertas obtenidas",
            status: 200,
            ok: true,
            data: rows === null || rows === void 0 ? void 0 : rows.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.getOffersByUser = getOffersByUser;
