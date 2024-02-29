import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../secrets/gcloud-storage.json"),
  projectId: "ascprueba", // Reemplaza con el ID de tu proyecto de GCP
});

const bucketName = "pruebaa-bucket-asc";

const generateEncryptedName = (originalName: any, content: any) => {
  // Crear un hash SHA-256 del contenido del archivo para "cifrar" el nombre
  const hash = crypto.createHash("sha256").update(content).digest("hex");
  // Usar un UUID para garantizar la unicidad del nombre
  const uniqueId = uuidv4();
  // Concatenar el hash y el UUID para formar el nuevo nombre del archivo
  const encryptedName = `${uniqueId}-${hash}`;
  // Conservar la extensión original del archivo si es necesario
  const extension = originalName.split(".").pop();
  return `${encryptedName}.${extension}`;
};

const uploadToGCS = async (file: any) => {
  const bucket = storage.bucket(bucketName);
  const newFileName = generateEncryptedName(file.originalname, file.buffer);
  const blob = bucket.file(newFileName);
  const blobStream = blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream
      .on("error", (err) => reject(err))
      .on("finish", () => {
        // El archivo ha sido subido a GCS
        resolve(`gs://${bucketName}/${newFileName}`);
      })
      .end(file.buffer);
  });
};

export { uploadToGCS };
