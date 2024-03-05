"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileController = void 0;
const storageService_1 = require("../../../utils/storageService");
const db_1 = __importDefault(require("../../../database/db"));
const uploadFileController = async (req, res) => {
    const { postulanteId } = req.body;
    if (!req.file) {
        return res.status(400).send("No se ha recibido ningún archivo");
    }
    try {
        const db = await (0, db_1.default)();
        const newNameFile = await (0, storageService_1.uploadToGCS)(req.file);
        const url_public = `https://storage.googleapis.com/pruebaa-bucket-asc/${newNameFile}`;
        const query = `UPDATE postulante SET cv = $1 WHERE postulante_id = $2`;
        await (db === null || db === void 0 ? void 0 : db.query(query, [url_public, postulanteId]));
        res.send({
            status: 200,
            message: "Archivo subido correctamente",
            url_public,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error al subir el archivo");
    }
};
exports.uploadFileController = uploadFileController;
