"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToGCS = void 0;
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
const storage = new storage_1.Storage({
    keyFilename: path_1.default.join(__dirname, "../secrets/gcloud-storage.json"),
    projectId: "ascprueba", // Reemplaza con el ID de tu proyecto de GCP
});
const bucketName = "pruebaa-bucket-asc";
const generateEncryptedName = (originalName, content) => {
    // Crear un hash SHA-256 del contenido del archivo para "cifrar" el nombre
    const hash = crypto_1.default.createHash("sha256").update(content).digest("hex");
    // Usar un UUID para garantizar la unicidad del nombre
    const uniqueId = (0, uuid_1.v4)();
    // Concatenar el hash y el UUID para formar el nuevo nombre del archivo
    const encryptedName = `${uniqueId}-${hash}`;
    // Conservar la extensión original del archivo si es necesario
    const extension = originalName.split(".").pop();
    return `${encryptedName}.${extension}`;
};
const uploadToGCS = async (file) => {
    const bucket = storage.bucket(bucketName);
    const newFileName = generateEncryptedName(file.originalname, file.buffer);
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream();
    // QUIERO QUE TMB ME RETORNE EL NEWFILENAME
    return new Promise((resolve, reject) => {
        blobStream.on("error", (error) => {
            reject(error);
        });
        blobStream.on("finish", () => {
            resolve(newFileName);
        });
        blobStream.end(file.buffer);
    });
};
exports.uploadToGCS = uploadToGCS;
